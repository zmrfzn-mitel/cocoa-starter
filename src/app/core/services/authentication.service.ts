import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CLUser } from '@core/models/cl-user';
import { Logger } from '@core/services/logger.service';
import { environment } from '@env/environment';
import { CompanySwitcherService } from '@mitel/cloudlink-console-components';
import { Account, AuthenticationService, Claims, Config, Token, UserClaims } from '@mitel/cloudlink-sdk';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { distinct, map } from 'rxjs/operators';

const log = new Logger('AuthenticationService');

export class AuthState {

    /** Current Auth Token */
    public token: Token;

    /** Current Claims Object */
    public claims: Claims;

    /** Current CLUser Object  */
    public user: CLUser;

    constructor() {

    }
}

/** Service - Provides Authentication for Mitel.io */
@Injectable({
    providedIn: 'root',
})
export class AuthService {

    private _state: BehaviorSubject<AuthState> = new BehaviorSubject<AuthState>(undefined);

    private _company: Account;
    public companyChanged = new Subject<Account>();

    private _claims: UserClaims;
    public claimsChanged = new Subject<UserClaims>();

    private _showCurrentAccount: boolean;
    public currentAccountStateChanged = new Subject<boolean>();


    /** Current Auth Token */
    public get state(): Observable<AuthState> {
        return this._state.pipe(distinct(state => state ? state.token.access_token : undefined));
    }

    constructor
    (
        private http: HttpClient,
        private auth: AuthenticationService,
        private companySwitcherService: CompanySwitcherService
    ) {
    }

    public getState(): AuthState {
        return this._state.value;
    }

    public setClaims(claims: UserClaims): Promise<AuthState> {

        const newState = new AuthState();

        newState.claims = claims;

        return this.auth.getToken()
            .then(token => {
                if (token) {

                    newState.token = token;
                    newState.user = this._getUserFromClaims(claims as UserClaims);
                    log.info('Loaded Token from Local Store');

                    this._state.next(newState);

                    log.info('[Claims Set]');

                    return this._state.getValue();
                }
                else {
                    log.error('No Token in Local Store');
                    throw new Error('AuthenticationService - No Token in Local Store');
                }
            })
            .catch(err => {
                log.error('Error getting token from store', err);
                throw err;
            });
    }

    public setCompany(company: Account): void {
        this._company = company;
        this.companyChanged.next(this._company);
    }

    public getClaims(): UserClaims {
        return this._claims;
    }

    public getCompany(): Account {
        return this._company;
    }

    public getCurrentAccountDisplay(): boolean {
        return this._showCurrentAccount;
    }

    public setCurrentAccountDisplay(display: boolean): void {
        this.currentAccountStateChanged.next(display);
        this._showCurrentAccount = display;
    }

    private _getUserFromClaims(claims: UserClaims): CLUser {
        const user = new CLUser();
        user.userId = claims.principalId;
        user.accountId = claims.accountId;
        user.name = claims.name;
        user.role = claims.role;
        user.photoUrl = (claims as any).photoUrl;

        return user;
    }

    public setSession(currentAccountId: string, isFirstLogin?: boolean): void {
        log.info(`AuthenticationService.setSession`);
        if (isFirstLogin) {
            sessionStorage.setItem('refreshed', 'false');
            sessionStorage.setItem('just-logged-in', 'true');
            sessionStorage.removeItem('accountId');
            sessionStorage.setItem('accountId', currentAccountId);
        } else {
            sessionStorage.setItem('refreshed', 'true');
            sessionStorage.setItem('just-logged-in', 'false');
            sessionStorage.setItem('accountId', currentAccountId);
        }

    }

    public logout(): void {
        log.info(`AuthenticationService.logout`);
        this.auth.logout()
            .then(_result => {
                this._state.next(undefined);
            })
            .catch(error => log.error(`AuthenticationService.logout`, error));
    }

    public getToken(): Promise<Token> {
        return this.auth.getToken();
    }

    public isLoggedIn(): Promise<boolean> {

        try {

            const isLoggedIn = this._state.getValue() ? true : false;

            log.info('isLoggedIn', isLoggedIn);

            return Promise.resolve(isLoggedIn);
        } catch (error) {
            log.warn('authentication.service.isLoggedIn', error);
            return Promise.reject(error);
        }
    }

    async refresh(): Promise<void> {
        await this.auth.whoAmI();
    }

}

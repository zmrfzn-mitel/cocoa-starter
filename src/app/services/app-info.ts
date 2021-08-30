export interface AppModel {
  name: string;
  translationKey: string;
  id: string;
  minRole: string;
  navigation: string;
  iconActive?: string;
  iconInactive?: string;
  canaryFlagEnabled?: string;
  canaryFlagDisabled?: string;
  permission?: number;
  children?: AppModel[];
  featureEnabled?: {};
}

export const AppList: AppModel[] = [{
  name: 'Dashboard',
  translationKey: 'Dashboard',
  id: 'dashboard',
  minRole: 'BILLING_ADMIN',
  navigation: '/'
}, {
  name: 'Users & Locations',
  translationKey: 'Users & Locations',
  id: 'users_and_locations',
  minRole: 'ACCOUNT_ADMIN',
  navigation: '/norouting',
  children: [{
    name: 'Users',
    translationKey: 'Users',
    id: 'Users',
    minRole: 'ACCOUNT_ADMIN',
    navigation: '/users',
  }, {
    name: 'Locations',
    translationKey: 'Locations',
    id: 'locations',
    minRole: 'ACCOUNT_ADMIN',
    navigation: '/directory_location',
    canaryFlagEnabled: '2199',

  }, {
    name: 'Locations (New)',
    translationKey: 'Locations',
    id: 'new_locations',
    minRole: 'ACCOUNT_ADMIN',
    navigation: '/locations/list'
  }]
}, {
  name: 'Main Line',
  translationKey: 'Main Line',
  id: 'main_line',
  minRole: 'ACCOUNT_ADMIN',
  navigation: '/norouting',
  children: [{
    name: 'Flows',
    translationKey: 'Flows',
    id: 'flows',
    minRole: 'ACCOUNT_ADMIN',
    navigation: '/callflow_flows',
  }, {
    name: 'Schedules',
    translationKey: 'Schedules',
    id: 'Schedules',
    minRole: 'ACCOUNT_ADMIN',
    navigation: '/callflow_schedules',
  }, {
    name: 'Extension Groups',
    translationKey: 'Extension Groups',
    id: 'extensiongroups',
    minRole: 'ACCOUNT_ADMIN',
    navigation: '/callflow_extensiongroups',
  }]
},
// {
//   name: 'Phones',
//   translationKey: 'Phones',
//   id: 'phones',
//   minRole: 'ACCOUNT_ADMIN',
//   navigation: '/phones'
// },
{
  name: 'Hardware',
  translationKey: 'Hardware',
  id: 'hardware',
  minRole: 'ACCOUNT_ADMIN',
  navigation: '/hardware',
  featureEnabled: { isFeatureEnabledByCountry: 'hardware_boss' }
},
{
  name: 'Hardware-list',
  translationKey: 'hardware-list',
  id: 'hardware-list',
  minRole: 'ACCOUNT_ADMIN',
  navigation: '/hardware/hardware-list',
  featureEnabled: { isFeatureEnabledByVersion: '3.4', isFeatureEnabledByCountry: 'hardware_console' }
},
{
  name: 'Phone Numbers',
  translationKey: 'Phone Numbers',
  id: 'phone_numbers',
  minRole: 'ACCOUNT_ADMIN',
  navigation: '/norouting',
  children: [{
    name: 'Inventory',
    translationKey: 'Inventory',
    id: 'inventory',
    minRole: 'ACCOUNT_ADMIN',
    navigation: '/phonenumbers_inventory',
    featureEnabled: {
      isFeatureEnabledByCountry: 'inventory_boss'
    }
  },
  {
    name: 'Inventory (New)',
    translationKey: 'Inventory New',
    id: 'inventory_new',
    minRole: 'ACCOUNT_ADMIN',
    navigation: '/phone-numbers/inventory',
    featureEnabled: {
      isFeatureEnabledByVersion: '3.4',
      isFeatureEnabledByCountry: 'inventory_console'
    }
  },
  {
    name: 'New Local Numbers',
    translationKey: 'New Local Numbers',
    id: 'new_local_numbers',
    minRole: 'ACCOUNT_ADMIN',
    navigation: '/phone-numbers/local-numbers',
  }, {
    name: 'New Toll-Free Numbers',
    translationKey: 'New Toll-Free Numbers',
    id: 'new_toll_free_numbers',
    minRole: 'ACCOUNT_ADMIN',
    navigation: '/phone-numbers/toll-free',
  }, {
    name: 'New Geo Numbers',
    translationKey: 'New Geo Numbers',
    id: 'new_geo_numbers',
    minRole: 'ACCOUNT_ADMIN',
    navigation: '/phone-numbers/geo-numbers',
  }, {
    name: 'New Non Geographic Numbers',
    translationKey: 'New Non Geographic Numbers',
    id: 'new_non_geo_numbers',
    minRole: 'ACCOUNT_ADMIN',
    navigation: '/phone-numbers/non-geo-numbers',
  },
  {
    name: 'Transfer Requests',
    translationKey: 'Transfer Requests',
    id: 'new_transfer_requests',
    minRole: 'ACCOUNT_ADMIN',
    navigation: '/phone-numbers/transfer-requests',
    featureEnabled: {
      isFeatureEnabledByVersion: '3.4',
      isFeatureEnabledByCountry: 'transfer_request'
    }
  }]
}, {
  name: 'Phone System',
  translationKey: 'Phone System',
  id: 'phone_system',
  minRole: 'ACCOUNT_ADMIN',
  navigation: '/norouting',
  children: [{
    name: 'Bridged Call Appearances',
    translationKey: 'Bridged Call Appearances',
    id: 'bridged_call_appearances',
    minRole: 'ACCOUNT_ADMIN',
    navigation: '/phonesystem_bridgecallapperances',
    featureEnabled: { isFeatureEnabledByRolesForFlag: 'boss_iframe' },
  }, {
    name: 'Emergency Calling',
    translationKey: 'Emergency Calling',
    id: 'emergency_calling',
    minRole: 'ACCOUNT_ADMIN',
    navigation: '/phonesystem_emergencycalling',
  }, {
    name: 'Hold Music',
    translationKey: 'Hold Music',
    id: 'hold_music',
    minRole: 'ACCOUNT_ADMIN',
    navigation: '/phonesystem_holdmusic',
    featureEnabled: { isFeatureEnabledByRolesForFlag: 'boss_iframe' },
  }, {
    name: 'Programmable Buttons',
    translationKey: 'Programmable Buttons',
    id: 'programmable_buttons',
    minRole: 'ACCOUNT_ADMIN',
    navigation: '/phonesystem_programmablebuttons',
    featureEnabled: { isFeatureEnabledByRolesForFlag: 'boss_iframe' },
  }, {
    name: 'Settings Groups',
    translationKey: 'Settings Groups',
    id: 'settings_groups',
    minRole: 'ACCOUNT_ADMIN',
    navigation: '/phonesystem_settingsgroup',
    featureEnabled: { isFeatureEnabledByRolesForFlag: 'boss_iframe' },
  }]
}, {
  name: 'Add-On Apps',
  translationKey: 'Add-On Apps',
  id: 'addons_apps',
  minRole: 'ACCOUNT_ADMIN',
  navigation: '/norouting',
  featureEnabled: { isFeatureEnabledByRolesForFlag: 'boss_iframe' },
  children: [{
    name: 'Manage Add-Ons',
    translationKey: 'Manage Add-Ons',
    id: 'manage_addons',
    minRole: 'ACCOUNT_ADMIN',
    navigation: '/addons_manage',
  }, {
    name: 'Integrations & Downloads',
    translationKey: 'Integrations & Downloads',
    id: 'integrations',
    minRole: 'ACCOUNT_ADMIN',
    navigation: '/addons_integrationsdownloads',
  }]
}, {
  name: 'Billing',
  translationKey: 'Billing',
  id: 'billing',
  minRole: 'BILLING_ADMIN',
  navigation: '/norouting',
  children: [{
    name: 'Invoices',
    translationKey: 'billing_invoice',
    id: 'billing_invoice',
    minRole: 'BILLING_ADMIN',
    navigation: '/billing_invoices',
    featureEnabled: { isFeatureEnabledByRolesForFlag: 'boss_iframe' },
  }, {
    name: 'Orders',
    translationKey: 'Orders',
    id: 'orders',
    minRole: 'BILLING_ADMIN',
    navigation: '/orders',
  }, {
    name: 'Services',
    translationKey: 'Services',
    id: 'services',
    minRole: 'BILLING_ADMIN',
    navigation: '/billing_services',
    featureEnabled: { isFeatureEnabledByRolesForFlag: 'boss_iframe' },
  }, {
    name: 'Usage',
    translationKey: 'All Usage',
    id: 'all_usage',
    minRole: 'BILLING_ADMIN',
    navigation: '/billing_usage',
    featureEnabled: { isFeatureEnabledByRolesForFlag: 'boss_iframe' },
  }]
}, {
  name: 'Reports',
  translationKey: 'Reports',
  id: 'Reports',
  minRole: 'ACCOUNT_ADMIN',
  navigation: '/reports',
  featureEnabled: { isFeatureEnabledByRolesForFlag: 'boss_iframe' },
}, {
  name: 'Partner',
  translationKey: 'Partner',
  id: 'partner',
  minRole: 'ACCOUNT_ADMIN',
  navigation: '/partner-access/partner-list',
  permission: 10317
}];

export const supportedLanguages: any = [{
  name: 'English (US)',
  langCode: 'en-US',
  displayAbbr: 'EN (US)'
}, {
  name: 'English (UK)',
  langCode: 'en-GB',
  displayAbbr: 'EN (UK)'
}, {
  name: 'Français',
  langCode: 'fr-FR',
  displayAbbr: 'FR'
}, {
  name: 'Deutsch',
  langCode: 'de-DE',
  displayAbbr: 'DE'
}];

export const PartnerType: Array<string> = [
  'None',
  'Support',
  'VAR',
  'AW'
]

export const Roles: Array<string> = [
  'STAFF_ADMIN',
  'AW_ADMIN',
  'VAR_ADMIN',
  'SUPPORT_ADMIN',
  'ACCOUNT_ADMIN',
  'BILLING_ADMIN',
  'USER'
];

/**
* Left side is the role name
* Right side is the role weight
* For minimum role testing, any role weight higher is granted access
*/
export enum RoleMap {
  STAFF_ADMIN = 100,
  AW_ADMIN = 80,
  VAR_ADMIN = 60,
  SUPPORT_ADMIN = 40,
  ACCOUNT_ADMIN = 20,
  BILLING_ADMIN = 10,
  USER = 0
}

/**
* The side navigation requires this
*
* TODO: Once we have our own navigation component this can be deleted
*/
export enum clRoleMap {
  ADMIN = 1,
  BILLING = 3,
  STAFF = 6
}

/**
* Obsolete
* TODO: Remove this code once all references have been deleted
*/
export const bossRoleMap: any = [{
  role: 'USER',
  rank: 0
}, {
  role: 'BILLING_ADMIN',
  rank: 1
}, {
  role: 'ACCOUNT_ADMIN',
  rank: 2
}];


export interface IAccountInfo {
  countryCode: number
}

/**
* Information related to the partner
*/
export const PartnerInfo = {
  productionUS: {
    partnerId: '992000002',
    commonName: 'Production US'
  },
  alpha: {
    partnerId: '992000001',
    commonName: 'Alpha'
  },
  can01: {
    partnerId: '527812169',
    commonName: 'CAN01'
  },
  mift: {
    partnerId: '441870381',
    commonName: 'MIFT'
  },
  sit: {
    partnerId: '991000002',
    commonName: 'SIT'
  },
  utit: {
    partnerId: '991000001',
    commonName: 'UTIT'
  },
  performance: {
    partnerId: '995500001',
    commonName: 'Performance'
  },
  bossUSQA: {
    partnerId: '991000008',
    commonName: 'BOSS US QA'
  },
  bossSCOQA: {
    partnerId: '991000006',
    commonName: 'BOSS SCO QA'
  },
  ukdMAC: {
    partnerId: '991000022',
    commonName: 'UKD-MAC'
  },
  ukqWIN: {
    partnerId: '991000023',
    commonName: 'UKQ-WIN'
  },
  productionUK: {
    partnerId: '992000005',
    commonName: 'PRODUCTION - UK'
  },
  euq: {
    partnerId: '991000025',
    commonName: 'EUQ'
  }
};

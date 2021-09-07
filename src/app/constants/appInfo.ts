export const navItems: any[] = [
    {
        name: 'Home',
        id: 'home',
        translationKey: 'home', 
        minRole: 'USER',
        navigation: '/',
        iconActive: '/assets/icons/dashboard_active.svg',
        iconInactive: '/assets/icons/dashboard_inactive.svg'
    },
    {
        name: 'Sample Module',
        id: 'sample',
        translationKey: 'sample',
        minRole: 'USER',
        navigation: '/sample',
        iconActive: '/assets/icons/groups_active.svg',
        iconInactive: '/assets/icons/groups_inactive.svg'
    },
];

export const supportedLanguages: any = [{
    name: 'English (US)',
    langCode: 'en-US',
    displayAbbr: 'EN (US)'
},
// {
//   name: 'English (UK)',
//   langCode: 'en-GB',
//   displayAbbr: 'EN (UK)'
// }, {
//   name: 'Français',
//   langCode: 'fr-FR',
//   displayAbbr: 'FR'
// }, 
{
    name: 'Deutsch',
    langCode: 'de-DE',
    displayAbbr: 'DE'
}
];

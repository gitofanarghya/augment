const initialState = {
    org: [],
    currentPage: 'Dashboard',
    company: '',
    companyObj: '',
    center: '',
    centerObj: '',
    apartment: '',
    apartmentObj: '',
    motionData: [],
    period: '1hr',
    loggedIn: true,
    sleepData: [],
    lastContact: ''
}

export function app(state, action) {
    if (typeof state === 'undefined') {
        return initialState
    }
    switch (action.type) {

        case 'get_last_contact_success':
            return {
                ...state,
                lastContact: action.json[0]
            }

        case 'get_soft_notification_details_success':
            return {
                ...state,
                sleepData: action.json
            }

        case 'direct_logout':
            return {
                ...state,
                loggedIn: false
            }

        case 'direct_login':
            return {
                ...state,
                loggedIn: true
            }

        case 'set_period':
            return {
                ...state,
                period: action.period
            }

        case 'get_motion_data_request':
            return {
                ...state,
                motionData: []
            }

        case 'get_motion_data_success':
            return {
                ...state,
                motionData: action.json
            }

        case 'get_org_success':
            return {
                ...state,
                org: action.json
            }
        
        case 'set_company':
            return {
                ...state,
                company: action.company,
                companyObj: state.org.filter(c => c.name === action.company)[0],
                center: '',
                centerObj: '',
                apartment: '',
                apartmentObj: '',
                currentPage: 'Dashboard',
                period: '1hr'
            }

        case 'set_center':
            return {
                ...state,
                center: action.center,
                centerObj: state.org.filter(c => c.name === state.company)[0].centers.filter(c => c.name === action.center)[0],
                apartment: '',
                apartmentObj: '',
                period: '1hr',
                currentPage: 'Dashboard'
            }
        
        case 'set_apartment':
            return {
                ...state,
                apartment: action.apartment,
                currentPage: state.currentPage === 'Dashboard' ? 'Apartment' : state.currentPage,
                period: '1hr',
                apartmentObj: state.org.filter(c => c.name === state.company)[0].centers.filter(c => c.name === state.center)[0].apartments.filter(a => a.name === action.apartment)[0]
            }

        case 'CHANGE_PAGE':
            return {
                ...state,
                currentPage: action.page,
                sleepData: []
            }
        default:
            return state
    }
}
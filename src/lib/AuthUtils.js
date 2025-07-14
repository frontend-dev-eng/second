import {GUEST_AUTH_TOKEN, GUEST_AUTH_TOKEN_VALUE, SUCCESS} from "../assets/constants/Constants"
import {getTenantAndAssignmentSettings} from "./BackendUtils";

export const isGuestUserAuthenticated = (userInfo) => {
    let isAuthenticatedUserInfoAvailableInBrowserStorage = true;

    if ( !(userInfo?.id) ) {
        isAuthenticatedUserInfoAvailableInBrowserStorage = false;
    }
    else if ( !(userInfo?.access) ) {
        isAuthenticatedUserInfoAvailableInBrowserStorage = false;
    }
    else if ( !(userInfo?.email) && !(userInfo?.mobile_number) ) {
        isAuthenticatedUserInfoAvailableInBrowserStorage = false;
    }

    return isAuthenticatedUserInfoAvailableInBrowserStorage;
}

export const getTenantAssignmentLockerBankConfigurationSettings = async (domain, lockerBankId) => {
    let configurationSettings = {
        tenantAssignmentAndLockerBankSettings: null,
        errorMessage: null
    };
    const additionalHeaders = {[GUEST_AUTH_TOKEN]: GUEST_AUTH_TOKEN_VALUE};
    const body = {locker_bank: lockerBankId};
    const response = await getTenantAndAssignmentSettings(domain, additionalHeaders, body);

    if (response.status === SUCCESS) {
        let areAllSettingsConfiguredProperlyForLuggageUseCase = true;
        let isTenantActive = false;
        let isTenantConfiguredForLuggageUseCase = false;
        let isAssignmentActive = false;
        let isAssignmentConfiguredForLuggageUseCase = false;
        let isOTPLoginEnabled = false;
        let isEmailAddressEnabledForOTPLogin = false;
        let isMobileNumberEnabledForOTPLogin = false;
        let isOTPlessLoginEnabled = false;
        let isAutomaticLockerUnitAssignmentEnabled = false;
        let isManualLockerUnitSelectionEnabled = false;
        let maximumLockerUnitsAllowedPerUser = 0;
        let assignmentPricing = null;
        let lockerBankName = "";
        let lockerBankLocation = "";
        let availableLockersCount = null;

        if (response.data.data.tenant_settings && response.data.data.assignments) {
            isTenantActive = response.data.data.tenant_settings.active === true ? true : false;
            isTenantConfiguredForLuggageUseCase = response.data.data.tenant_settings.use_case_settings.is_luggage === true ? true : false;
            isEmailAddressEnabledForOTPLogin = response.data.data.tenant_settings.use_case_settings.luser_email_mand === true ? true : false;
            isMobileNumberEnabledForOTPLogin = response.data.data.tenant_settings.use_case_settings.luser_mobile_no_mand === true ? true : false;
            isAssignmentActive = response.data.data.assignments[0].is_active === true ? true : false;
            maximumLockerUnitsAllowedPerUser = response.data.data.assignments[0].lockers_allowed;

            const assignmentSettings = response.data.data.assignments[0].settings_util;
            assignmentPricing = response.data.data.assignments[0].assignment_pricing_data[lockerBankId];
            isAssignmentConfiguredForLuggageUseCase = assignmentSettings.luggage === true ? true : false;
            isOTPLoginEnabled = assignmentSettings.verify_with_otp === true ? true : false;
            isOTPlessLoginEnabled = assignmentSettings.otpless === true ? true : false;
            isAutomaticLockerUnitAssignmentEnabled = assignmentSettings.any_available === true ? true : false;
            isManualLockerUnitSelectionEnabled = assignmentSettings.select_manual === true ? true : false;
            lockerBankName = response.data.data.locker_bank_information.name ? response.data.data.locker_bank_information.name : "";
            lockerBankLocation = response.data.data.locker_bank_information.location ? response.data.data.locker_bank_information.location : "";
            availableLockersCount = response.data.data.locker_bank_information.available_lockers_count ? response.data.data.locker_bank_information.available_lockers_count : null;

            if (!isTenantActive) {
                areAllSettingsConfiguredProperlyForLuggageUseCase = false;
            }
            else if (!isTenantConfiguredForLuggageUseCase) {
                areAllSettingsConfiguredProperlyForLuggageUseCase = false;
            }
            else if (!isAssignmentActive) {
                areAllSettingsConfiguredProperlyForLuggageUseCase = false;
            }
            else if (!isAssignmentConfiguredForLuggageUseCase) {
                areAllSettingsConfiguredProperlyForLuggageUseCase = false;
            }
            else if (maximumLockerUnitsAllowedPerUser < 1) {
                areAllSettingsConfiguredProperlyForLuggageUseCase = false;
            }
            else if (!isOTPLoginEnabled && !isOTPlessLoginEnabled) {
                areAllSettingsConfiguredProperlyForLuggageUseCase = false;
            }
            else if (isOTPLoginEnabled && (!isEmailAddressEnabledForOTPLogin && !isMobileNumberEnabledForOTPLogin)) {
                areAllSettingsConfiguredProperlyForLuggageUseCase = false;
            }
            else if (!isAutomaticLockerUnitAssignmentEnabled && !isManualLockerUnitSelectionEnabled) {
                areAllSettingsConfiguredProperlyForLuggageUseCase = false;
            }

            if (areAllSettingsConfiguredProperlyForLuggageUseCase) {
                configurationSettings.tenantAssignmentAndLockerBankSettings = {
                    isOTPLoginEnabled: isOTPLoginEnabled,
                    isEmailAddressEnabledForOTPLogin: isEmailAddressEnabledForOTPLogin,
                    isMobileNumberEnabledForOTPLogin: isMobileNumberEnabledForOTPLogin,
                    isOTPlessLoginEnabled: isOTPlessLoginEnabled,
                    allowedLockersCount: maximumLockerUnitsAllowedPerUser,
                    assignmentPricing: assignmentPricing,
                    lockerBankName: lockerBankName,
                    lockerBankLocation: lockerBankLocation
                };
                configurationSettings.availableLockersCount = availableLockersCount;
            }
            else {
                configurationSettings.errorMessage = 'error_msg_locker_bank_under_maintenance_try_again';
            }
        }
        else {
            configurationSettings.errorMessage = 'error_msg_error_while_fetching_locker_bank_settings_try_again';
        }
    }
    else {
        configurationSettings.errorMessage = 'error_msg_error_while_fetching_locker_bank_settings_try_again';
    }

    return configurationSettings;
}
import {Component} from "react";
import {withTranslation} from "react-i18next";
import {MdAccountCircle, MdEmail, MdPhone, MdLogout} from "react-icons/md";
import {LOCAL_STORAGE, LS_GUEST_USER} from "../assets/constants/BrowserStorageKeys";
import {getSecureItemFromSpecificStorage} from "../lib/BrowserStorageAccessMiddleware";

class UserModal extends Component {
    constructor (props) {
        super (props)

        const userInfo = getSecureItemFromSpecificStorage(LOCAL_STORAGE, LS_GUEST_USER);

        this.state = {
            showLogoutConfirmationMessage: false,
            userEmail: userInfo.email ? userInfo.email : "",
            userPhone: userInfo.phone ? userInfo.phone : ""
        }
    }

    render () {
        return (
            <div className="user-modal-content">
                {!this.state.showLogoutConfirmationMessage ? (
                    <div className="user-information-and-navigation-options">
                        <div className="user-information">
                            <div className="icon-container user-icon-container">
                                <MdAccountCircle className="icon-md-account-circle" />
                            </div>
                            <div className="email-and-phone-container">
                                <div className="user-email-container">
                                    <div className="icon-container">
                                        <MdEmail className="icon-md-email" />
                                    </div>
                                    <div className="user-email">{this.state.userEmail}</div>
                                </div>
                                <div className="user-phone-container">
                                    <div className="icon-container">
                                        <MdPhone className="icon-md-phone" />
                                    </div>
                                    <div className="user-phone">{this.state.userPhone}</div>
                                </div>
                            </div>
                        </div>
                        <div className="line-divider"></div>
                        <div className="navigation-options">
                            <div className="logout-container" onClick={() => this.setState({showLogoutConfirmationMessage: true})}>
                                <div className="icon-container">
                                    <MdLogout className="icon-md-logout" />
                            </div>
                                <div className="logout-option">{this.props.t('button_logout')}</div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="logout-confirmation-message-container">
                        <div className="logout-confirmation-message">{this.props.t('are_you_sure_to_logout')}</div>
                        <div className="buttons-container">
                            <div className="cancel-button" onClick={() => this.setState({showLogoutConfirmationMessage: false})}>{this.props.t('button_cancel')}</div>
                            <div className="logout-button" onClick={this.props.logoutHandlerFunction}>{this.props.t('button_logout')}</div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default withTranslation()(UserModal);
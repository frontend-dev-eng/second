import {Component} from "react";
import {withTranslation} from "react-i18next";

class ErrorPage extends Component {
    constructor (props) {
        super (props)
    }

    componentDidMount = () => {
        console.log(`componentDidMount - Error page`);
    }

    componentWillUnmount = () => {
        console.log(`componentWillUnmount - Error page`);
    }

    render () {
        return (
            <div className="error-page">
                <div className="header-container">
                    <div className="header">
                        <img className="durolt-logo" src={require("../assets/images/durolt_app_logo.png")} alt={this.props.t('durolt_logo')} />
                    </div>
                </div>
                <div className="main-container">
                    <div className="main"></div>
                </div>
                {/* <div className="footer-container">
                    <div className="footer"></div>
                </div> */}
            </div>
        );
    }
}

export default withTranslation()(ErrorPage);
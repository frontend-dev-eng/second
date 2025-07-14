import {Component} from "react";
import {withTranslation} from "react-i18next";

class HelpPage extends Component {
    constructor (props) {
        super (props)
    }

    componentDidMount = () => {
        console.log(`componentDidMount - Help page`);
    }

    componentWillUnmount = () => {
        console.log(`componentWillUnmount - Help page`);
    }

    render () {
        return (
            <div className="help-page">
                <div className="header-container">
                    <div className="header">
                        <div className="">Help</div>
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

export default withTranslation()(HelpPage);
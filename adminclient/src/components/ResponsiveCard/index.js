import React, { Component, } from 'react';
import { Card, CardHeader, CardHeaderIcon, CardContent, CardHeaderTitle, Content, } from 're-bulma';
import 'font-awesome/css/font-awesome.css';
import styles from '../../styles';

export default class ResponsiveCard extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      headerColor: props.headerColor || styles.isSecondaryBackground,
      headerText: props.headerText || styles.isWhite,
      display: 'block',
      icon: 'fa fa-angle-down',
      cardTitle: props.cardTitle || 'Not set',
    };
  }

  expandCard() {
    this.setState({
      display: (this.state.display === 'none') ? 'block' : 'none',
      icon: (this.state.icon === 'fa fa-angle-down') ? 'fa fa-angle-right' : 'fa fa-angle-down',
    });
  }

  render() {
    let fullCard = (
      <Card isFullwidth>
        <CardHeader>
          <CardHeaderTitle style={this.state.headerColor}>
            {this.state.cardTitle}
          </CardHeaderTitle>
          <CardHeaderIcon icon={this.state.icon} onClick={() => this.expandCard()}/>
        </CardHeader>
        <CardContent style={{ display: this.state.display, }}>
          <Content>
            {this.props.children}  
          </Content>
        </CardContent>
      </Card>);
    return fullCard;
  }
}
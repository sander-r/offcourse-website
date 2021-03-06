import {
  AuthenticationDetails,
  CognitoUserAttribute,
  CognitoUser,
  CognitoUserPool,
} from 'amazon-cognito-identity-js';

import 'regenerator-runtime/runtime';

class Cognito {
  constructor({ UserPoolId, ClientId }) {
    this.signOut = this.signOut.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
    this.confirmNewPassword = this.confirmNewPassword.bind(this);
    this.signUp = this.signUp.bind(this);
    this.confirmSignUp = this.confirmSignUp.bind(this);
    this.signIn = this.signIn.bind(this);

    this.userPool = new CognitoUserPool({
      UserPoolId,
      ClientId,
    });
  }

  async signOut() {
    console.log(cognitoUser);
    await cognitoUser.signOut();
  }

  async resetPassword({ userName }) {
    const cognitoUser = new CognitoUser({
      Username: userName,
      Pool: this.userPool
    });
    const errorResponses = {
      LimitExceededException: {
        general: "You tried too many times, wait a bit..."
      },
      UserNotFoundException: { userName: "Unknown User Name" }
    };
    return new Promise((resolve, reject) => {
      cognitoUser.forgotPassword({
        onSuccess: resolve,
        onFailure: error => {
          console.log(error);
          reject(errorResponses[error.name]);
        }
      });
    });
  }

  async confirmNewPassword({ userName, password, confirmationCode }) {
    const cognitoUser = new CognitoUser({
      Username: userName,
      Pool: this.userPool,
    });

    const errorResponses = {};

    return new Promise((resolve, reject) => {
      cognitoUser.confirmPassword(confirmationCode, password, {
        onSuccess: resolve,
        onFailure: error => {
          console.log(error);
          reject({ confirmationCode: 'invalid confirmation code' });
        }
      });
    });
  }

  signUp({ userName, password, email }) {
    const dataEmail = {
      Name: 'email',
      Value: email,
    };
    const attributeEmail = new CognitoUserAttribute(dataEmail);
    const attributeList = [attributeEmail];

    const errorResponses = {
      UsernameExistsException: {
        userName: 'user name is taken',
      },
    };

    return new Promise((resolve, reject) => {
      this.userPool.signUp(
        userName,
        password,
        attributeList,
        null,
        (error, result) => {
          if (error) {
            console.log(error);
            reject(errorResponses[error.name]);
            return;
          }
          return resolve(result);
        }
      );
    });
  }

  async confirmSignUp({ userName, confirmationCode }) {
    const cognitoUser = new CognitoUser({
      Username: userName,
      Pool: this.userPool,
    });

    return new Promise((resolve, reject) => {
      cognitoUser.confirmRegistration(
        confirmationCode,
        true,
        (error, result) => {
          if (error) {
            console.log(error);
            reject(error);
            return;
          }
          resolve(result);
        }
      );
    });
  }

  async signIn({ userName, password }) {
    const authData = new AuthenticationDetails({
      Username: userName,
      Password: password,
    });

    const cognitoUser = new CognitoUser({
      Username: userName,
      Pool: this.userPool,
    });

    return new Promise((resolve, reject) => {
      cognitoUser.authenticateUser(authData, {
        onSuccess: ({ accessToken, refreshToken }) => {
          resolve({
            userName: userName,
            accessToken: accessToken.jwtToken,
            refreshToken: refreshToken.token
          });
        },
        onFailure: error => {
          console.log(error);
          reject({ userName: 'invalid user name or password' });
        }
      });
    });
  };
}

const cognito = new Cognito({
  UserPoolId: 'us-east-1_KrD1aUKhs',
  ClientId: 'ga43rgf1nmg1ejbevg375se20'
});

export default cognito;

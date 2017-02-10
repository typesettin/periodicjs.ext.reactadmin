'use strict';

module.exports = function (resources) {
	// console.log('setting up react admin router');
  const reactadminController = resources.app.controller.extension.reactadmin.controller.reactadmin;
  const ReactAdminRouter = resources.express.Router();
  const ensureApiAuthenticated = resources.app.controller.extension.oauth2server.auth.ensureApiAuthenticated;
//   const accountController = resources.app.controller.native.account;
  const uacController = resources.app.controller.extension.user_access_control.uac;
  const mfaController = resources.app.controller.extension.login_mfa

  ReactAdminRouter.post('/manifest', ensureApiAuthenticated, uacController.loadUserRoles, reactadminController.loadManifest);
  ReactAdminRouter.post('/preferences', ensureApiAuthenticated, uacController.loadUserRoles, reactadminController.loadUserPreferences);
  ReactAdminRouter.post('/navigation', ensureApiAuthenticated, uacController.loadUserRoles, reactadminController.loadNavigation);
  ReactAdminRouter.post('/configurations', ensureApiAuthenticated, uacController.loadUserRoles, reactadminController.loadConfigurations);
  ReactAdminRouter.post('/mfa', ensureApiAuthenticated, mfaController.authenticate_totp);
  ReactAdminRouter.get('/components/:component', reactadminController.loadComponent);
  ReactAdminRouter.get('/healthcheck', function (req, res) {
    res.status(200).send({ status: 'ok', });
  });

  return ReactAdminRouter;
};
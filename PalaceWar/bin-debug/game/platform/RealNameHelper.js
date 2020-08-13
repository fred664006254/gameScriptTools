var RealNameHelper;
(function (RealNameHelper) {
    function RealnameSdkInputView(opt) {
        ViewController.getInstance().openView(ViewConst.POPUP.REAlNAME3POPUPVIEW, opt);
    }
    RealNameHelper.RealnameSdkInputView = RealnameSdkInputView;
    function showTip(msg) {
        App.CommonUtil.showTip(msg);
    }
    RealNameHelper.showTip = showTip;
})(RealNameHelper || (RealNameHelper = {}));
//# sourceMappingURL=RealNameHelper.js.map
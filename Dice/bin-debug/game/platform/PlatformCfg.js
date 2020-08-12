var PlatformCfg;
(function (PlatformCfg) {
    /**
     * 绑定手机
     */
    PlatformCfg.bindPhone = {};
    PlatformCfg.weichatPub = {};
    PlatformCfg.useSDK = {
        "17001000": "0",
        "17001001": "1",
        "17001002": "1",
        "devsdk": "1"
    };
    /**
     * 皇帝说话的最大限制
     */
    PlatformCfg.emperortalkMaxNumberCfg = {
        "th": 40,
        "en": 50,
        "other": 30,
    };
    /**
     * 聊天的最大字数配置
     */
    PlatformCfg.chatMaxNumberCfg = {
        "en": 120,
        "ru": 120,
        "other": 60,
    };
    PlatformCfg.closeSwitchAcount = {
        "fkylc": "1",
        "wanba": "1",
        "jj": "1"
    };
    PlatformCfg.platNameCfg = {
        "17001000": "3k",
        "17004000": "tw"
    };
    PlatformCfg.contactCfg = {
        // "17001001":"客服电话:4009933348",
        "17001002": ["客服QQ:3004776131", "客服电话:400-993-3348"],
        "17001003-17001137": ["客服QQ:3557595700"],
    };
    var statementStrCfg = {
        "shangyi": "\u62B5\u5236\u4E0D\u826F\u6E38\u620F\uFF0C\u62D2\u7EDD\u76D7\u7248\u6E38\u620F\u3002\u6CE8\u610F\u81EA\u6211\u4FDD\u62A4\uFF0C\u8C28\u9632\u53D7\u9A97\u4E0A\u5F53\u3002\n\u9002\u5EA6\u6E38\u620F\u76CA\u8111\uFF0C\u6C89\u8FF7\u6E38\u620F\u4F24\u8EAB\u3002\u5408\u7406\u5B89\u6392\u65F6\u95F4\uFF0C\u4EAB\u53D7\u5065\u5EB7\u751F\u6D3B\u3002\n\u9002\u9F849+ \u65B0\u5E7F\u51FA\u5BA1[2017]10497 \u53F7  ISBN 978-7-498-03283-6  \n\u51FA\u7248\u5355\u4F4D\uFF1A\u65B9\u5706\u7535\u5B50\u97F3\u50CF\u51FA\u7248\u793E\u6709\u9650\u8D23\u4EFB\u516C\u53F8 \u8457\u4F5C\u6743\u4EBA\uFF1A\u5929\u6D25\u5C1A\u6613\u4E92\u52A8\u79D1\u6280\u6709\u9650\u516C\u53F8",
    };
    PlatformCfg.statementCfg = {
        "533002000": statementStrCfg.shangyi,
        "wx": statementStrCfg.shangyi
    };
    /**
     * 配置的key标识不是充值档位，只是为了显示货币单位
     */
    PlatformCfg.hwpriceCfg = [
        "acDiscount_yearcardDesc",
        "acDiscount_newyearcardDesc",
        "acWishTreeTip2",
        "acWishTreeBtnTxt1",
        "acWishTreeBtnTxt2",
        "firstRecharge1",
        "firstRecharge2",
        "firstRecharge3",
        "firstRecharge4",
    ];
    /**
     * 泰国使用google支付的档位
     */
    PlatformCfg.th3RechargeCfg = [];
    /**
     * 审核服新手引导完成后进入的功能
     */
    PlatformCfg.shenheFunctionName = "trade";
})(PlatformCfg || (PlatformCfg = {}));
//# sourceMappingURL=PlatformCfg.js.map
var Config;
(function (Config) {
    /**
     * 皮肤配置
     */
    var WifeconversationCfg;
    (function (WifeconversationCfg) {
        /**--role:对话方。1：我。2：对方。无：旁白
        --choice:选项
        --next:跳转至几号剧情
        --getReward:奖励*/
        WifeconversationCfg.conversation1 = "";
        function formatData(data) {
            this.conversation1 = data.conversation1;
        }
        WifeconversationCfg.formatData = formatData;
        function getConversatiById(id) {
            return this.conversation1[id];
        }
        WifeconversationCfg.getConversatiById = getConversatiById;
    })(WifeconversationCfg = Config.WifeconversationCfg || (Config.WifeconversationCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=WifeConversationCfg.js.map
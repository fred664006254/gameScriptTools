var Config;
(function (Config) {
    /**
     * 擂台配置
     */
    var AtkraceCfg;
    (function (AtkraceCfg) {
        /**
         * 解锁条件  拥有 X 个门客
         */
        var unlock;
        /**
         * 门客等级
         */
        var servantLv;
        var dailyNum;
        /**
         * 每次间隔时间 单位（秒）
         */
        var intervalTime;
        /**
         * 出使消耗道具
         */
        var fightAdd;
        /**
         * 复仇消耗道具
         */
        var revenge;
        /**
         * 挑战消耗道具
         */
        var challenge;
        /**
         * 追杀消耗道具 暂用道具
         */
        var hunt;
        /**
         * 额外出使次数： 大于等于60级门客数量 / parameter1  向下取整
         */
        var parameter1;
        var parameter3;
        var iniAtt;
        var juniorAtt;
        var mediumAtt;
        var seniorAtt;
        /**擂台战斗门客站位，0是己方，1是对方，下对齐 */
        AtkraceCfg.servantPosCfg = [
            [
                { x: 106.7, y: 355, scale: 35 / 45 },
                { x: 320, y: 355, scale: 35 / 45 },
                { x: 533.3, y: 355, scale: 35 / 45 },
                { x: 160, y: 180, scale: 1 },
                { x: 480, y: 180, scale: 1 }
            ],
            [
                { x: 106.7, y: 610, scale: 30 / 45 },
                { x: 320, y: 610, scale: 30 / 45 },
                { x: 533.3, y: 610, scale: 30 / 45 },
                { x: 160 + 20, y: 695, scale: 25 / 45 },
                { x: 480 - 20, y: 695, scale: 25 / 45 }
            ]
        ];
        /**擂台战斗门客战斗动画配置 */
        AtkraceCfg.servantAtkPosCfg = {
            atkb1: [{ y: 60, scale: 40 / 45 }, { y: -40, scale: 25 / 45 }],
            atk1: [{ y: -200, scale: 32 / 45 }, { y: 150, scale: 32 / 45 }],
            atkb2: [{ y: 100, scale: 55 / 45 }, { y: -20, scale: 20 / 45 }],
            atk2: [{ y: -415, scale: 32 / 45 }, { y: 215, scale: 32 / 45 }],
        };
        function formatData(data) {
            unlock = data.unlock;
            servantLv = data.servantLv;
            dailyNum = data.dailyNum;
            intervalTime = data.intervalTime;
            fightAdd = data.fightAdd;
            revenge = data.revenge;
            challenge = data.challenge;
            hunt = data.hunt;
            parameter1 = data.parameter1;
            parameter3 = data.parameter3;
            iniAtt = data.iniAtt;
            juniorAtt = data.juniorAtt;
            mediumAtt = data.mediumAtt;
            seniorAtt = data.seniorAtt;
        }
        AtkraceCfg.formatData = formatData;
        /**
         * 每日武馆次数
         */
        function getDailyNum() {
            return dailyNum;
        }
        AtkraceCfg.getDailyNum = getDailyNum;
        /**
         * 额外出战系数
         */
        function getParameter1() {
            return parameter1;
        }
        AtkraceCfg.getParameter1 = getParameter1;
        /**
         * 门客等级限制
         */
        function getServantLv() {
            return servantLv[0];
        }
        AtkraceCfg.getServantLv = getServantLv;
        /**
         * 门客等级与数量限制
         * @return [等级, 数量]
         */
        function getservantLvAndNum() {
            return servantLv;
        }
        AtkraceCfg.getservantLvAndNum = getservantLvAndNum;
        /**
         * 每次间隔时间 单位（秒）
         */
        function getIntervalTime() {
            return intervalTime;
        }
        AtkraceCfg.getIntervalTime = getIntervalTime;
        /**
         * 解锁条件  拥有 X 个门客
         */
        function getUnlock() {
            return unlock;
        }
        AtkraceCfg.getUnlock = getUnlock;
        /**
         * 初始属性
         */
        function getInitAtt(key) {
            return iniAtt[key];
        }
        AtkraceCfg.getInitAtt = getInitAtt;
        /**
         * 初级属性
         */
        function getJuniorAtt(key) {
            return juniorAtt[key];
        }
        AtkraceCfg.getJuniorAtt = getJuniorAtt;
        /**
         * 中级属性
         */
        function getMediumAtt(key) {
            return mediumAtt[key];
        }
        AtkraceCfg.getMediumAtt = getMediumAtt;
        /**
         * 高级属性
         */
        function getSeniorAtt(key) {
            return seniorAtt[key];
        }
        AtkraceCfg.getSeniorAtt = getSeniorAtt;
        function getFightAdd() {
            return fightAdd;
        }
        AtkraceCfg.getFightAdd = getFightAdd;
        /**
         * 获取出战消耗道具ID
         */
        function getCostId(type) {
            switch (type) {
                case AtkraceFightTypes.choose:
                    return fightAdd;
                case AtkraceFightTypes.revenge:
                    return revenge;
                case AtkraceFightTypes.kill:
                    return hunt;
                case AtkraceFightTypes.challenge:
                    return challenge;
                default:
                    return "";
            }
        }
        AtkraceCfg.getCostId = getCostId;
        /**
         * 上榜条件 击败多少名
         */
        function getbeatNum() {
            return parameter3;
        }
        AtkraceCfg.getbeatNum = getbeatNum;
    })(AtkraceCfg = Config.AtkraceCfg || (Config.AtkraceCfg = {}));
})(Config || (Config = {}));

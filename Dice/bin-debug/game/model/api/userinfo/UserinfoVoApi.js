var Api;
(function (Api) {
    var UserinfoVoApi;
    (function (UserinfoVoApi) {
        var userinfoVo;
        var flyStartPoint;
        var freshNow;
        var freshCard = true;
        var status = 1; // 刚进游戏 
        function getStatus() {
            return status;
        }
        UserinfoVoApi.getStatus = getStatus;
        function setStatus(v) {
            status = v;
        }
        UserinfoVoApi.setStatus = setStatus;
        function formatData(data) {
            if (!userinfoVo) {
                userinfoVo = new UserinfoVo();
            }
            userinfoVo.initData(data);
        }
        UserinfoVoApi.formatData = formatData;
        function getUid() {
            return userinfoVo ? userinfoVo.uid : GameData.uid;
        }
        UserinfoVoApi.getUid = getUid;
        /**
         * 显示的UID
         */
        function getShowUid() {
            return getUid() * 3 + 136759;
        }
        UserinfoVoApi.getShowUid = getShowUid;
        function getGold() {
            var num = 0;
            if (userinfoVo && userinfoVo.gold) {
                num = userinfoVo.gold;
            }
            return num;
        }
        UserinfoVoApi.getGold = getGold;
        function getSumb() {
            var num = 0;
            if (userinfoVo && userinfoVo.sumb) {
                num = userinfoVo.sumb;
            }
            return num;
        }
        UserinfoVoApi.getSumb = getSumb;
        function getGem() {
            var num = 0;
            if (userinfoVo && userinfoVo.gem) {
                num = userinfoVo.gem;
            }
            return num;
        }
        UserinfoVoApi.getGem = getGem;
        function getScore() {
            var num = 0;
            if (userinfoVo && userinfoVo.score) {
                num = userinfoVo.score;
            }
            return num;
        }
        UserinfoVoApi.getScore = getScore;
        function getMaxScore() {
            var num = 0;
            if (userinfoVo && userinfoVo.maxscore) {
                num = userinfoVo.maxscore;
            }
            return num;
        }
        UserinfoVoApi.getMaxScore = getMaxScore;
        function getLevel() {
            var num = 0;
            if (userinfoVo && userinfoVo.level) {
                num = userinfoVo.level;
            }
            return num;
        }
        UserinfoVoApi.getLevel = getLevel;
        function getName() {
            var str = "";
            if (userinfoVo && userinfoVo.name) {
                str = userinfoVo.name;
            }
            return str;
        }
        UserinfoVoApi.getName = getName;
        function getMygid() {
            var num = 0;
            if (userinfoVo && userinfoVo.mygid) {
                num = userinfoVo.mygid;
            }
            return num;
        }
        UserinfoVoApi.getMygid = getMygid;
        function getMygname() {
            return (userinfoVo && userinfoVo.mygname) ? userinfoVo.mygname : "";
        }
        UserinfoVoApi.getMygname = getMygname;
        function getMaxscore() {
            return (userinfoVo && userinfoVo.maxscore) ? userinfoVo.maxscore : 0;
        }
        UserinfoVoApi.getMaxscore = getMaxscore;
        function getCard() {
            return (userinfoVo && userinfoVo.card) ? userinfoVo.card : 0;
        }
        UserinfoVoApi.getCard = getCard;
        function getWin() {
            return (userinfoVo && userinfoVo.win) ? userinfoVo.win : 0;
        }
        UserinfoVoApi.getWin = getWin;
        function getLose() {
            return (userinfoVo && userinfoVo.lose) ? userinfoVo.lose : 0;
        }
        UserinfoVoApi.getLose = getLose;
        function getMaxturn() {
            return (userinfoVo && userinfoVo.maxturn) ? userinfoVo.maxturn : 0;
        }
        UserinfoVoApi.getMaxturn = getMaxturn;
        function getBuyg() {
            return (userinfoVo && userinfoVo.buyg) ? userinfoVo.buyg : 0;
        }
        UserinfoVoApi.getBuyg = getBuyg;
        function getBuyt() {
            return (userinfoVo && userinfoVo.buyt) ? userinfoVo.buyt : 0;
        }
        UserinfoVoApi.getBuyt = getBuyt;
        function getFreeg() {
            return (userinfoVo && userinfoVo.freeg) ? userinfoVo.freeg : 0;
        }
        UserinfoVoApi.getFreeg = getFreeg;
        function getCardBox() {
            var curCard = userinfoVo.card;
            var num = Api.GameinfoVoApi.getGnum();
            var list = Config.TogetherCfg.getNeedCardList();
            var temCard = curCard;
            var boxnum = 0;
            for (var index = num; index < list.length; index++) {
                if (temCard >= list[index]) {
                    temCard -= list[index];
                    boxnum++;
                }
                else {
                    return boxnum;
                }
            }
            boxnum += Math.floor(temCard / list[list.length - 1]);
            return boxnum;
        }
        UserinfoVoApi.getCardBox = getCardBox;
        function setFreshCard(isfresh) {
            freshCard = isfresh;
        }
        UserinfoVoApi.setFreshCard = setFreshCard;
        function getFreshCard() {
            return freshCard;
        }
        UserinfoVoApi.getFreshCard = getFreshCard;
        /**
         * 获取卡片进度条的信息
         */
        function getPorgressInfo() {
            return {
                curCard: userinfoVo.card,
                needcard: Config.TogetherCfg.getNeedCard(Api.GameinfoVoApi.getGnum()),
                por: userinfoVo.card / Config.TogetherCfg.getNeedCard(Api.GameinfoVoApi.getGnum())
            };
        }
        UserinfoVoApi.getPorgressInfo = getPorgressInfo;
        /**
         * 获取当前等级的经验进度条的值
         */
        function getLevelExppro() {
            var num = 0;
            var level = Api.UserinfoVoApi.getLevel();
            var curCap = Api.UserinfoVoApi.getScore();
            curCap = (Config.LevelCfg.getLevelNeedScore(level + 1) < curCap) ? Config.LevelCfg.getLevelNeedScore(level + 1) - 1 : curCap;
            var tem = curCap - Config.LevelCfg.getLevelNeedScore(level);
            var upnum = Config.LevelCfg.getLevelNeedScore(level + 1) - Config.LevelCfg.getLevelNeedScore(level);
            num = tem / upnum;
            return num;
        }
        UserinfoVoApi.getLevelExppro = getLevelExppro;
        /**
         * 获取目前的经验值
         */
        function getCurLevelExp() {
            var needscore = Config.LevelCfg.getLevelNeedScore(Api.UserinfoVoApi.getLevel());
            return userinfoVo.score - needscore;
        }
        UserinfoVoApi.getCurLevelExp = getCurLevelExp;
        function getFyStartPoint() {
            return flyStartPoint;
        }
        UserinfoVoApi.getFyStartPoint = getFyStartPoint;
        function setFreshInfo(bool, point) {
            freshNow = bool;
            flyStartPoint = point;
        }
        UserinfoVoApi.setFreshInfo = setFreshInfo;
        function getFreshNow() {
            return freshNow;
        }
        UserinfoVoApi.getFreshNow = getFreshNow;
        function dispose() {
            if (userinfoVo) {
                userinfoVo.dispose();
                userinfoVo = null;
            }
            flyStartPoint = null;
            freshNow = false;
            freshCard = true;
            status = 1;
        }
        UserinfoVoApi.dispose = dispose;
    })(UserinfoVoApi = Api.UserinfoVoApi || (Api.UserinfoVoApi = {}));
})(Api || (Api = {}));
//# sourceMappingURL=UserinfoVoApi.js.map
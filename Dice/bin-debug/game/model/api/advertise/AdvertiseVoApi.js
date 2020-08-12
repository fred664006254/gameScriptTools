var Api;
(function (Api) {
    var AdvertiseVoApi;
    (function (AdvertiseVoApi) {
        var adVo = null;
        var adtype = "";
        /**是否战斗按钮播放火焰特效 */
        var playhuo = false;
        /**非好友对战标准 */
        AdvertiseVoApi.notfriend = false;
        function formatData(data) {
            if (!adVo) {
                adVo = new AdvertiseVo();
            }
            adVo.initData(data);
            var tem = LocalStorageMgr.get(Api.UserinfoVoApi.getUid() + "_playhuo");
            if (tem && tem == '1') {
                playhuo = true;
            }
            else {
                playhuo = false;
            }
        }
        AdvertiseVoApi.formatData = formatData;
        function getAdVo() {
            return adVo;
        }
        AdvertiseVoApi.getAdVo = getAdVo;
        function getAdInfoByID(id) {
            return adVo.Info[id];
        }
        AdvertiseVoApi.getAdInfoByID = getAdInfoByID;
        /**
         * 获取广告的剩余次数
         */
        function getAdNumByID(id) {
            var ad = getAdInfoByID(id);
            var num = 0;
            if (ad && ad.num)
                num = ad.num;
            switch (id) {
                case "adv1":
                    num = Config.GamebaseCfg.advertise1 - num;
                    break;
                case "adv2":
                    num = Config.GamebaseCfg.advertise2 - num;
                    break;
                case "adv3":
                    num = Config.GamebaseCfg.advertise3 - num;
                    break;
                case "adv4":
                    num = Config.GamebaseCfg.advertise4 - num;
                    break;
                case "adv5":
                    num = Config.GamebaseCfg.advertise5 - num;
                    break;
                default:
                    break;
            }
            return num;
        }
        AdvertiseVoApi.getAdNumByID = getAdNumByID;
        /**
         * 获取广告 cd 时间
         * @param id 广告id
         */
        function getAdCurCD(id) {
            var num = 0;
            var ad = getAdInfoByID(id);
            if (!ad || !ad.st) {
                return 0;
            }
            var t = (new Date()).getTime();
            t = t / 1000;
            t = t - ad.st;
            switch (id) {
                case AdConst.ADV_1:
                    num = Config.GamebaseCfg.advertiseCD1 - t;
                    break;
                case AdConst.ADV_2:
                    num = Config.GamebaseCfg.advertiseCD2 - t;
                    break;
                case AdConst.ADV_3:
                    num = Config.GamebaseCfg.advertiseCD3 - t;
                    break;
                case AdConst.ADV_4:
                    num = Config.GamebaseCfg.advertiseCD4 - t;
                    break;
                case AdConst.ADV_5:
                    num = Config.GamebaseCfg.advertiseCD5 - t;
                    break;
                default:
                    break;
            }
            return Math.ceil((num < 0) ? 0 : num);
        }
        AdvertiseVoApi.getAdCurCD = getAdCurCD;
        /**
         * 是否可以观看 id 广告
         * @param id 广告类型 id
         */
        function canWatchAdId(id) {
            return !(Api.AdvertiseVoApi.getAdNumByID(id) <= 0 || Api.AdvertiseVoApi.getAdCurCD(id) > 0);
        }
        AdvertiseVoApi.canWatchAdId = canWatchAdId;
        /**
         * 当前观看的广告类型
         * @param type 广告类型
         */
        function setAdtype(type) {
            if (!type || type == "") {
                return;
            }
            adtype = type;
        }
        AdvertiseVoApi.setAdtype = setAdtype;
        /**
         * 获取观看的广告类型
         */
        function getAdtype() {
            return adtype;
        }
        AdvertiseVoApi.getAdtype = getAdtype;
        /**设置播放火焰开关 */
        function setPlayHuo(flag) {
            LocalStorageMgr.set(Api.UserinfoVoApi.getUid() + "_playhuo", "" + (flag ? 1 : 0));
            playhuo = flag;
        }
        AdvertiseVoApi.setPlayHuo = setPlayHuo;
        /**获取播放火焰开关 */
        function getPlayHuo() {
            return playhuo;
        }
        AdvertiseVoApi.getPlayHuo = getPlayHuo;
        function dispose() {
            adVo = null;
            adtype = "";
            playhuo = false;
        }
        AdvertiseVoApi.dispose = dispose;
    })(AdvertiseVoApi = Api.AdvertiseVoApi || (Api.AdvertiseVoApi = {}));
})(Api || (Api = {}));
//# sourceMappingURL=AdvertiseVoApi.js.map
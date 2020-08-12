namespace Api
{
    export namespace AdvertiseVoApi
    {

        let adVo:AdvertiseVo = null;
        let adtype:string = "";
        /**是否战斗按钮播放火焰特效 */
        let playhuo:boolean = false;
        /**非好友对战标准 */
        export let notfriend = false;

        export function formatData(data:any):void
        {
            if(!adVo){
                adVo = new AdvertiseVo();
            }
            adVo.initData(data);
            let tem = LocalStorageMgr.get(`${Api.UserinfoVoApi.getUid()}_playhuo`);
            if(tem && tem == '1'){
                playhuo = true;
            } else {
                playhuo = false;
            }
        }

        export function getAdVo(){
            return adVo;
        }

        export function getAdInfoByID(id:string){
            return adVo.Info[id];
        }

        /**
         * 获取广告的剩余次数
         */
        export function getAdNumByID(id:string){
            let ad = getAdInfoByID(id);
            let num = 0;
            if(ad && ad.num) num = ad.num;
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

        /**
         * 获取广告 cd 时间
         * @param id 广告id
         */
        export function getAdCurCD(id:string):number{
            let num = 0;
            let ad = getAdInfoByID(id);
            if(!ad || !ad.st){
                return 0;
            }

            let t:number = (new Date()).getTime();
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

            return Math.ceil( (num < 0) ? 0 : num );
        }

        /**
         * 是否可以观看 id 广告
         * @param id 广告类型 id
         */
        export function canWatchAdId(id:string):boolean{
            return !(Api.AdvertiseVoApi.getAdNumByID(id) <= 0 || Api.AdvertiseVoApi.getAdCurCD(id) > 0);
        }

        /**
         * 当前观看的广告类型
         * @param type 广告类型
         */
        export function setAdtype(type:string){
            if(!type || type == ""){
                return;
            }
            adtype = type;
        }
        /**
         * 获取观看的广告类型
         */
        export function getAdtype(){
            return adtype
        }
        /**设置播放火焰开关 */
        export function setPlayHuo(flag:boolean){
            LocalStorageMgr.set(`${Api.UserinfoVoApi.getUid()}_playhuo`, `${flag?1:0}`);
            playhuo = flag;
        }
        /**获取播放火焰开关 */
        export function getPlayHuo():boolean {
            return playhuo;
        }

        export function dispose(){
            adVo = null;
            adtype = "";
            playhuo = false;
        }
    }
}
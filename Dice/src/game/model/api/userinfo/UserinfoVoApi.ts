namespace Api{
    export namespace UserinfoVoApi{
        let userinfoVo:UserinfoVo;
        let flyStartPoint:egret.Point;
        let freshNow:boolean;
        let freshCard:boolean = true;
        let status: number = 1; // 刚进游戏 

        export function getStatus(){
            return status;
        }
        export function setStatus(v:number){
            status = v;
        }
        export function formatData(data:any):void{
            if(!userinfoVo){
				userinfoVo=new UserinfoVo();
			}
			userinfoVo.initData(data);
        }

        export function getUid():number{
            return userinfoVo?userinfoVo.uid:GameData.uid;
        }

        /**
         * 显示的UID
         */
        export function getShowUid():number
        {
            return getUid() * 3 + 136759;
        }

        export function getGold():number{
            let num = 0;
            if(userinfoVo && userinfoVo.gold){
                num = userinfoVo.gold;
            }
            return num;
        }

        export function getSumb():number{
            let num = 0;
            if(userinfoVo && userinfoVo.sumb){
                num = userinfoVo.sumb;
            }
            return num;
        }

        export function getGem():number{
            let num = 0;
            if(userinfoVo && userinfoVo.gem){
                num = userinfoVo.gem;
            }
            return num;
        }

        export function getScore():number{
            let num = 0;
            if(userinfoVo && userinfoVo.score){
                num = userinfoVo.score;
            }
            return num;
        }

        export function getMaxScore():number{
            let num = 0;
            if(userinfoVo && userinfoVo.maxscore){
                num = userinfoVo.maxscore;
            }
            return num;
        }

        export function getLevel():number{
            let num = 0;
            if(userinfoVo && userinfoVo.level){
                num = userinfoVo.level;
            }
            return num;
        }

        export function getName():string{
            let str = ``;
            if(userinfoVo && userinfoVo.name){
                str = userinfoVo.name;
            }
            return str;
        }

        export function getMygid():number{
            let num = 0;
            if(userinfoVo && userinfoVo.mygid){
                num = userinfoVo.mygid;
            }
            return num;
        }

        export function getMygname():string{
            return (userinfoVo && userinfoVo.mygname) ? userinfoVo.mygname : "";
        }
        export function getMaxscore():number{
            return (userinfoVo && userinfoVo.maxscore) ? userinfoVo.maxscore : 0;
        }
        export function getCard():number{
            return (userinfoVo && userinfoVo.card) ? userinfoVo.card : 0;
        }
        export function getWin():number{
            return (userinfoVo && userinfoVo.win) ? userinfoVo.win : 0;
        }
        export function getLose():number{
            return (userinfoVo && userinfoVo.lose) ? userinfoVo.lose : 0;
        }
        export function getMaxturn():number{
            return (userinfoVo && userinfoVo.maxturn) ? userinfoVo.maxturn : 0;
        }
        export function getBuyg():number{
            return (userinfoVo && userinfoVo.buyg) ? userinfoVo.buyg : 0;
        }
        export function getBuyt():number{
            return (userinfoVo && userinfoVo.buyt) ? userinfoVo.buyt : 0;
        }
        export function getFreeg():number{
            return (userinfoVo && userinfoVo.freeg) ? userinfoVo.freeg : 0;
        }

        export function getCardBox(){
            let curCard = userinfoVo.card;
            
            let num = GameinfoVoApi.getGnum();
            let list = Config.TogetherCfg.getNeedCardList();
            let temCard = curCard;
            let boxnum = 0;
            for(let index = num; index < list.length; index++){
                if(temCard >= list[index]){
                    temCard -= list[index];
                    boxnum++;
                } else {
                    return boxnum;
                }
            }

            boxnum += Math.floor(temCard / list[list.length - 1]);
            
            return boxnum;
        }

        export function setFreshCard(isfresh:boolean) {
            freshCard = isfresh;
        }

        export function getFreshCard() {
            return freshCard;
        }

        /**
         * 获取卡片进度条的信息
         */
        export function getPorgressInfo(){
            return {
                curCard: userinfoVo.card,
                needcard: Config.TogetherCfg.getNeedCard(GameinfoVoApi.getGnum()),
                por:userinfoVo.card/Config.TogetherCfg.getNeedCard(GameinfoVoApi.getGnum())
            }
        }

        /**
         * 获取当前等级的经验进度条的值
         */
        export function getLevelExppro(){
            let num:number = 0;
            let level = Api.UserinfoVoApi.getLevel();
            let curCap = Api.UserinfoVoApi.getScore();
            curCap = (Config.LevelCfg.getLevelNeedScore(level+1) < curCap) ? Config.LevelCfg.getLevelNeedScore(level+1) - 1 : curCap;
            let tem = curCap - Config.LevelCfg.getLevelNeedScore(level);
            let upnum = Config.LevelCfg.getLevelNeedScore(level+1) - Config.LevelCfg.getLevelNeedScore(level);
            num = tem / upnum;
            return num;
        }
        /**
         * 获取目前的经验值
         */
        export function getCurLevelExp():number{
            let needscore = Config.LevelCfg.getLevelNeedScore(Api.UserinfoVoApi.getLevel());
            return userinfoVo.score - needscore;
        }

        export function getFyStartPoint():egret.Point{
            return flyStartPoint;
        }

        export function setFreshInfo(bool:boolean, point : egret.Point):void{
            freshNow = bool;
            flyStartPoint = point;
        }

        export function getFreshNow():boolean{
            return freshNow;
        }

        export function dispose():void{
            if(userinfoVo){
				userinfoVo.dispose();
				userinfoVo=null;
            }
            flyStartPoint = null;
            freshNow = false;
            freshCard = true;
            status = 1;
        }
    }
}
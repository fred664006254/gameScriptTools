/**
 * 功能预告
 * date 2019.9.29
 * author ycg
 * @class AcWelcomeVo
 */
class AcWelcomeVo extends AcBaseVo{
    public constructor(){
        super();
    }

    public initData(data:any):void{
        for (let key in data){
            this[key] = data[key];
        }
    }

    //倒计时
    public getCountDown():string{
        let et = this.et;
		if (et < GameData.serverTime) {
			return LanguageManager.getlocal("acPunishEnd");
		}
		return App.DateUtil.getFormatBySecond((et - GameData.serverTime), 18);
    }

    public get cfg(){
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }
}
/**
 * 港台周年庆 折扣商店
 * date 2019.11.28
 * author ycg
 * @class AcAnniversaryShop2020Vo
 */
class AcAnniversaryShop2020Vo extends AcBaseVo{
    public shop1:any;
    public shop2:any;
    
    public constructor(){
        super();
    }

    public initData(data:any){
        for (let key in data){
            this[key] = data[key];
        }
    }

    //获取限时返场道具购买信息
	public getBuyShopList1(id:string):number{
		let buyNum = 0;
		if(this.shop1 && this.shop1[id]){
			buyNum = this.shop1[id];
		}
		return buyNum;
    }

    //获取折扣礼包道具购买信息
	public getBuyShopList2(id:string):number{
		let buyNum = 0;
		if(this.shop2 && this.shop2[id]){
			buyNum = this.shop2[id];
		}
		return buyNum;
    }
    
    public isInActivity():boolean{
		return GameData.serverTime >= this.st && GameData.serverTime < this.et;
	}

    ///活动日期时间显示
    public get acTimeAndHour(): string {
		let et = this.et;
		return App.DateUtil.getOpenLocalTime(this.st, et, true);
    }

    //倒计时
    public getCountDown():string{
        let et = this.et;
		if (et < GameData.serverTime) {
			return LanguageManager.getlocal("acPunishEnd");
		}
		return App.DateUtil.getFormatBySecond((et - GameData.serverTime), 1);
    }

    public isFirstInView():boolean{
        let key = this.aidAndCode + this.et + Api.playerVoApi.getPlayerID();
        let str = LocalStorageManager.get(key);
        if (str && str == "1"){
            return false;
        }
        return true;
    }
		

    public get isShowRedDot():boolean{
        return this.isFirstInView();
    }

    public dispose(){

        super.dispose();
    }
}
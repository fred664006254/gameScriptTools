/**
 * 请安列表item
 * date 2019.12.10
 * author ycg
 * @class EmperorAchieveViewScrollItem
 */
class EmperorOutWishScrollItem extends ScrollListItem{

    public constructor() {
		super();
	}
	
	public initItem(index: number, data: any, param: any): void {
        this.width = 532;
        this.height = 70;
        let uid = param.uid;

        App.LogUtil.log("init issame:"+data.isSame);
        if (data.isSame == 1){
            let allianceFlag = BaseBitmap.create("emperorout_allianceflag");
            allianceFlag.setPosition(10, this.height/2 - allianceFlag.height/2);
            this.addChild(allianceFlag);
        }

        let name = ComponentManager.getTextField(data.data.name, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        name.setPosition(60, this.height/2 - name.height/2);
        this.addChild(name);

        let level = ComponentManager.getTextField(LanguageManager.getlocal("officialTitle"+data.data.level), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        level.anchorOffsetX = level.width/2;
        level.setPosition(this.width/2 - 20, this.height/2 - level.height/2);
        this.addChild(level);

        let wishNum = ComponentManager.getTextField(""+data.data.value, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        wishNum.anchorOffsetX = wishNum.width/2;
        wishNum.setPosition(this.width/2 + 110, this.height/2 - wishNum.height/2);
        this.addChild(wishNum);

        let bonusData = Api.emperorAchieveVoApi.getBonusData();
        let num = Config.EmperoroutingCfg.bonusTimes;
        if (bonusData){
            let rNum = Object.keys(bonusData).length;
            num = num - rNum;
        }

        let outData = Api.emperorAchieveVoApi.getOutDataByuid(uid);
        let rewardBtn = ComponentManager.getButton("emperorout_rewardbtn", "emperorOutWishListRewardBtnName", ()=>{
            if (!outData || !Api.emperorAchieveVoApi.isInOuting(outData.st)){
                App.CommonUtil.showTip(LanguageManager.getlocal("emperorOutListEnd"));
                return;
            }
            ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                title:"emperorOutListConfirmTitle",
                msg:LanguageManager.getlocal("emperorOutListRewardTip", [data.data.name]),
                callback:()=>{
                    NetManager.request(NetRequestConst.REQUEST_EMPERORACHIEVE_BONUS, {fuid:data.data.uid});
                },
                handler:this,
                needCancel:true,
            })
            
        }, this);
        rewardBtn.setPosition(this.width - rewardBtn.width - 20, this.height/2 - rewardBtn.height/2);
        this.addChild(rewardBtn);
        rewardBtn.setColor(TextFieldConst.COLOR_BROWN);
        rewardBtn.visible = true;
        rewardBtn.setEnable(true);

        let receiveFlag = BaseBitmap.create("emperorout_rewardflag");
        receiveFlag.setScale(0.7);
        receiveFlag.setPosition(this.width - receiveFlag.width * receiveFlag.scaleX - 10, this.height/2 - receiveFlag.height * receiveFlag.scaleY / 2);
        this.addChild(receiveFlag);
        receiveFlag.visible = false;

        if (bonusData && bonusData[data.data.uid]){
            rewardBtn.visible = false;
            receiveFlag.visible = true;
        } 
        if (!outData || !Api.emperorAchieveVoApi.isInOuting(outData.st) || num <= 0){
            // rewardBtn.setEnable(false); 
            rewardBtn.visible = false;
        }

        let lineImg = BaseBitmap.create("public_line1");
        lineImg.width = this.width + 20;
        lineImg.x = this.width/2 - lineImg.width/2;
        lineImg.y = this.height - lineImg.height;
        this.addChild(lineImg);
    }

    public dispose():void{

        super.dispose();
    }
}
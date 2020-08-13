/**
  * 圣诞奖励item
  * author 张朝阳
  * date 2018/11/29
  * @class AcChristmasRewardScrollItem
  */
class AcChristmasRewardScrollItem extends ScrollListItem {
    public constructor() {
        super();
    }
    /**
     * 初始化item
     */
    public initItem(index: number, data: {id:string,reward: string, weight: number, isLight: boolean}, itemParam: any) {
        let vo = <AcChristmasVo>Api.acVoApi.getActivityVoByAidAndCode(itemParam.aid, itemParam.code);
        let scaleValue = 0.85;
        if (itemParam.scale){
            scaleValue = 0.9;
        }
        let rewardVo = GameData.formatRewardItem(data.reward)[0];
        // vo.getFloorReward(data.id,Number(itemParam.floor))?false:
        let light:boolean = false;
        if(vo.getFloor() >= 4)
        {
            light = data.isLight;
        }
        else
        {
            light = vo.getFloorReward(data.id,Number(itemParam.floor))?false:data.isLight;
        }
        let reward = GameData.getItemIcon(rewardVo,true,light);
        reward.setScale(scaleValue);
        //透明图填充Item
        let fillBg = BaseBitmap.create("public_alphabg");
        fillBg.width = reward.width * scaleValue + 13;
        fillBg.height = reward.height * scaleValue + 20;
        reward.setPosition(fillBg.x + fillBg.width / 2  - reward.width * scaleValue / 2 ,fillBg.y + fillBg.height / 2 - reward.height * scaleValue / 2 );
        fillBg.alpha = 0;
        this.width = fillBg.width;
        this.height = fillBg.height;
        this.addChild(fillBg);
        this.addChild(reward);
       
        if(vo.getFloorReward(data.id,Number(itemParam.floor))&&vo.getFloor() < 4)
        {
            let receiveBM = BaseBitmap.create("acchristmasview_smalldescbg");
            receiveBM.setPosition(reward.x + reward.width*scaleValue / 2 - receiveBM.width /2,reward.y + reward.height*scaleValue / 2 - receiveBM.height /2);
            this.addChild(receiveBM);

            let receiveTxt = ComponentManager.getTextField(LanguageManager.getlocal("acChristmasRewardPopupViewReceiveTip"),16,TextFieldConst.COLOR_LIGHT_YELLOW);
            receiveTxt.setPosition(receiveBM.x + receiveBM.width / 2 - receiveTxt.width /2,receiveBM.y + receiveBM.height / 2 - receiveTxt.height /2);
            this.addChild(receiveTxt);
            App.DisplayUtil.changeToGray(reward);
        }
        
    }



    public dispose(): void {
        super.dispose();
    }
}
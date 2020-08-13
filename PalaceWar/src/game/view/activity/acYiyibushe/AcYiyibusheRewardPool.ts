/**
 * 通用奖池展示面板
 * author ycg
 * date 2019.10.14
 * @class AcYiyibusheRewardPool
 */
class AcYiyibusheRewardPool extends PopupView{

    public constructor(){
        super();
    }

    public initView():void{
        let data = this.param.data;
        let topStr = LanguageManager.getlocal("acYiyibushePoolTip-"+this.getTypeCode());
        let topTxt = ComponentManager.getTextField(topStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        topTxt.setPosition(this.viewBg.x + this.viewBg.width/2 - topTxt.width/2, 15+40);
        this.addChildToContainer(topTxt);
        
        let listbg = BaseBitmap.create("public_9_bg4");
		listbg.width = 520;
		listbg.setPosition(this.viewBg.x + this.viewBg.width / 2 - listbg.width / 2, topTxt.y + topTxt.height + 5);
        this.addChildToContainer(listbg);   

        let scrolNode : BaseDisplayObjectContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(scrolNode);
        let rewardArr = GameData.getRewardItemIcons(data.rewards, true, true);
		for(let i in rewardArr){
			let icon = rewardArr[i];
			let idx = Number(i);

			icon.x = 9 + (idx % 4) * (108 + 20);
			icon.y = 7 + Math.floor(idx / 4) * (108 + 8);
			scrolNode.addChild(icon);
		}
		scrolNode.height = Math.ceil(rewardArr.length / 4) * (108 + 8);
        scrolNode.width = listbg.width - 20;
        listbg.height = Math.ceil(rewardArr.length / 4) * (108 + 8) + 20;

		let rect = new egret.Rectangle(listbg.x + 10, listbg.y + 5 , listbg.width - 20, listbg.height - 10);
        let scrollview : ScrollView = ComponentManager.getScrollView(scrolNode, rect)
		scrollview.bounces = false;
		scrollview.x = listbg.x + 10;
		scrollview.y = listbg.y + 5;
		scrollview.horizontalScrollPolicy = 'off';
        this.addChildToContainer(scrollview);
    }

    private getTypeCode():string{
        return this.code;
    }

    private get code():string{
        return this.param.data.code;
    }

    private get aid():string{
        return this.param.data.aid;
    }

    protected getTitleStr():string{
        return "acYiyibushePoolTitle";
    }

    protected getResourceList():string[]{
        return super.getResourceList().concat([

        ]);
    }

    public dispose():void{

        super.dispose();
    }
}

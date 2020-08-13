/**
 * 国庆活动 奖励预览
 * author yangchengguo
 * date 2019.9.16
 * @class  AcNationalDayRewardPopupView
 */
class AcNationalDayRewardPopupView extends PopupView{

    public constructor(){
        super();
    }

    public initView():void{
        let topTitle:BaseTextField = null;
        if (this.topMsg){
            topTitle = ComponentManager.getTextField(LanguageManager.getlocal(this.topMsg), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
            topTitle.setPosition(this.viewBg.x + this.viewBg.width / 2 - topTitle.width/2, 15+30);
            this.addChildToContainer(topTitle);
        }
        let listbg = BaseBitmap.create("public_9_probiginnerbg");
		listbg.width = 526;
		listbg.setPosition(this.viewBg.x + this.viewBg.width / 2 - listbg.width / 2, 15+30);
        this.addChildToContainer(listbg);   
        if (topTitle){
            listbg.setPosition(this.viewBg.x + this.viewBg.width / 2 - listbg.width / 2, topTitle.y + topTitle.height + 10);
        }

        let scrolNode : BaseDisplayObjectContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(scrolNode);
        scrolNode.width = listbg.width - 16;
        if (this.rewards){
            let rewardArr = GameData.getRewardItemIcons(this.rewards, true, true);
            for(let i in rewardArr){
                let icon = rewardArr[i];
                let idx = Number(i);
                icon.x = 10 + (idx % 4) * (108 + 20);
                icon.y = 9 + Math.floor(idx / 4) * (108 + 8);
                scrolNode.addChild(icon);
            }
            scrolNode.height = Math.ceil(rewardArr.length / 4) * (108 + 8);
            listbg.height = Math.ceil(rewardArr.length / 4) * (108 + 8) + 20;
            let rect = new egret.Rectangle(listbg.x + 8, listbg.y + 5 , listbg.width - 16, listbg.height - 10);
            let scrollview : ScrollView = ComponentManager.getScrollView(scrolNode, rect)
            scrollview.bounces = false;
            scrollview.x = listbg.x + 8;
            scrollview.y = listbg.y + 5;
            scrollview.horizontalScrollPolicy = 'off';
            this.addChildToContainer(scrollview);
        }
        
    }

    protected get rewards():string{
        if (this.param && this.param.data && this.param.data.rewards){
            return this.param.data.rewards;
        }
        return null;
    }

    protected get topMsg():string{
        if (this.param && this.param.data && this.param.data.topMsg){
            return this.param.data.topMsg;
        }
        return null;
    }

    protected getTitleStr():string
	{
		return "acNationalDayRewardTitle";
	}

    public dispose():void{

        super.dispose();
    }
}
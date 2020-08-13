/**
 * 道具详情弹板
 * author dmj
 * date 2017/9/19
 * @class ItemInfoPopupView
 */
class AcSingleDay2019GiftItemsPopupView extends PopupView
{


	private itemTxt:BaseTextField =null;
	public constructor() 
	{
		super();
    }
    
    private get cfg() : Config.AcCfg.SingleDay2019Cfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcSingleDay2019Vo{
        return <AcSingleDay2019Vo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get code():string{
        return this.param.data.code;
    }

    private get aid():string{
        return this.param.data.aid;
	}

	private get acTivityId() : string{
        return `${this.param.data.aid}-${this.code}`;
    }

    protected getBgName():string{
        return `newsingledaytab4gift${this.param.data.id}showbg-${this.getUiCode()}`
    }

    protected getUiCode():string{
        let code = '';
        switch(Number(this.code)){
            case 1:
			case 2:
				code = `1`;
				break;
            default:
                code = this.code;
                break;
        }
        return code;
    }

    protected getTitleStr():string{
        return null;
    }

	protected initView():void
	{	
		let moveY:number = 0;
		let bg:BaseBitmap = BaseBitmap.create("public_9_bg4");
		bg.width = 520;
		bg.x = this.viewBg.x + this.viewBg.width/2 - bg.width/2;
		bg.y = 50;
        this.addChildToContainer(bg); 

        let titleStr = LanguageManager.getlocal(this.param.data.titleName);
        let titleTf = ComponentManager.getTextField(titleStr, TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_BLACK);
        titleTf.setPosition(this.viewBg.x + this.viewBg.width/2 - titleTf.width/2, this.viewBg.y + 14);
        this.addChildToContainer(titleTf);
        
        let getReward = this.param.data.reward;
        let rewardArr =  GameData.formatRewardItem(getReward);
        let scroStartY = bg.y + 15;
        let len = Math.min(4, rewardArr.length)
        let tmpX = (bg.width - len * 108 - (len - 1) * 7) / 2;
        for (var index = 0; index < rewardArr.length; index++) {
            let iconItem = GameData.getItemIcon(rewardArr[index],true);
            iconItem.x = bg.x + tmpX;
            iconItem.y = scroStartY;
            tmpX += (iconItem.width * iconItem.scaleX +7);
            if (tmpX > bg.width-8)
            {
                tmpX = (bg.width - len * 108 - (len - 1) * 7) / 2;
                scroStartY += (iconItem.height * iconItem.scaleX) + 10;
                iconItem.x =  bg.x + tmpX;
                iconItem.y = scroStartY;
                tmpX += (iconItem.width  * iconItem.scaleX +7);
            }
            
            this.addChildToContainer(iconItem);
        }
        scroStartY += 106;
        bg.height = scroStartY - 35;
        this.viewBg.height = bg.height + 100;
	}

	protected isTouchMaskClose():boolean
	{
		return true;
	}

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([]);
	}

	public dispose():void
	{

		this.itemTxt = null;
		super.dispose();
	}
}
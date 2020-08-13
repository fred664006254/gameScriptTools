//神将突袭 战斗结果
class AcThreeKingdomsHeroAttackResultView  extends PopupView
{
    public constructor() {
		super();
    }
    
    private get cfg() : Config.AcCfg.ThreeKingdomsCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	
    private get vo() : AcThreeKingdomsVo{
        return <AcThreeKingdomsVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get code():string{
        return this.param.data.code;
    }

    private get aid():string{
        return this.param.data.aid;
	}

	protected getUiCode():string{
        let code = '';
        switch(Number(this.code)){
			case 1:
				code = `1`;
				break;
            default:
                code = this.code;
                break;
        }
        return code;
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
    }

    protected getTitleStr():string{
        return null;
    }
    
    protected initView():void{
        let aid = this.param.data.aid;
        let code = this.param.data.code;
        let tailorCfg = this.cfg;
        let re_data = this.param.data.reward;
        
        // NetManager.request(NetRequestConst.REQUEST_ACTIVITY_WIPEBOSSGETBOSSNUM, {
        //     activeId : this.vo.aidAndCode,
        // });	
    }

    protected getBgName():string{
        return `public_9_wordbg2`;
    }

    protected getCloseBtnName():string{
        return null;
    }

    protected resetBgSize():void{
        super.resetBgSize();
		let view = this;
		view.viewBg.alpha = 2;
        let tailor_get_light = BaseBitmap.create("tailor_get_light");
        tailor_get_light.anchorOffsetX =  tailor_get_light.width/2;
        tailor_get_light.anchorOffsetY =  tailor_get_light.height/2;
        tailor_get_light.x = GameConfig.stageWidth/2;
        tailor_get_light.y = view.viewBg.y;
        egret.Tween.get(tailor_get_light,{loop:true}).to({rotation:360},5000);
        this.addChildAt(tailor_get_light, 1)

        let tailor_get_light2 =  BaseBitmap.create("tailor_get_light");
        tailor_get_light2.anchorOffsetX =  tailor_get_light2.width/2;
        tailor_get_light2.anchorOffsetY =  tailor_get_light2.height/2;
        tailor_get_light2.x = tailor_get_light.x;
        tailor_get_light2.y = tailor_get_light.y;
        egret.Tween.get(tailor_get_light2,{loop:true}).to({rotation:-360},5000);
        this.addChildAt(tailor_get_light2,1)

        let tailor_get_wordbg = BaseBitmap.create("threekingdomsheroattacktitlebg");
        tailor_get_wordbg.anchorOffsetX =  tailor_get_wordbg.width/2;
        tailor_get_wordbg.anchorOffsetY =  tailor_get_wordbg.height/2;
        tailor_get_wordbg.x = GameConfig.stageWidth/2 ;
        tailor_get_wordbg.y = 0;
        // tailor_get_wordbg.setScale(0);
        // egret.Tween.get(tailor_get_wordbg,{loop:false}).to({scaleX:1.2,scaleY:1.2},200).to({scaleX:1.0,scaleY:1.0},50);
        this.addChildToContainer(tailor_get_wordbg);

        let tailor_get_word = BaseBitmap.create("tombfighttitle-1");
        tailor_get_word.anchorOffsetX =  tailor_get_word.width/2;
        tailor_get_word.anchorOffsetY =  tailor_get_word.height/2;
        tailor_get_word.x = GameConfig.stageWidth/2;
        tailor_get_word.y = tailor_get_wordbg.y - 30;
        // tailor_get_word.setScale(0);
        //egret.Tween.get(tailor_get_word,{loop:false}).wait(100).to({scaleX:1.2,scaleY:1.2},200).to({scaleX:1.0,scaleY:1.0},50);
        this.addChildToContainer(tailor_get_word);

		let code = view.getUiCode();
		let heroinfo = view.vo.getHeroAttackNpcPic(view.param.data.iskill);
        //提示
        let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acthreekingdomsheroattacktip3`,code), [heroinfo.name,view.param.data.damage]), 22);
        tipTxt.width = 590;
        tipTxt.lineSpacing = 10;
        tipTxt.textAlign = egret.HorizontalAlign.CENTER;
        tipTxt.setPosition(view.viewBg.x + (view.viewBg.width - tipTxt.width)/2, 41);
        this.addChildToContainer(tipTxt);
        //"6_1150_4|6_1710_1";
        //奖励
        
        let rewardTab = this.param.data.isauto ? this.param.data.rewardsarr : this.param.data.rewards.split('|');
        let len = Math.min(5,rewardTab.length);

		let rect = egret.Rectangle.create();
		rect.setTo(0,0,GameConfig.stageWidth,rewardTab.length > 5 ? 230 : 110);
        let rewardNode = new BaseDisplayObjectContainer();

		
		if(len){
			let tmpX = (GameConfig.stageWidth - len * 108 - (len - 1) * 15) / 2;
			let scroStartY = 0;//(bottomBg.height - (Math.ceil(rewardTab.length / 5) * 106 + (Math.ceil(rewardTab.length / 5) - 1) * 20)) / 2;//15;
			let rIcons = GameData.getRewardItemIcons(rewardTab.join("|"),true,false);
			let waitT = 0;
			if(rIcons.length == 1)
			{
				let element = rIcons[0];
				element.anchorOffsetX = element.width/2;
				element.anchorOffsetY = element.height/2;
				element.x = GameConfig.stageWidth/2;
				element.y = scroStartY + element.height/2;// + 40;
				// element.setScale(0);
				// waitT = 400;
				// egret.Tween.get(element,{loop:false}).to({scaleX:1.2,scaleY:1.2},200).to({scaleX:1.0,scaleY:1.0},50);
				rewardNode.addChild(element);
			}else{
				for (let index = 0; index < rIcons.length; index++) {
					let element = rIcons[index];
					element.anchorOffsetX = element.width/2;
					element.anchorOffsetY = element.height/2;
					// element.setScale(0);
					element.x = tmpX+ element.width/2;
					element.y = scroStartY + element.height/2;
					tmpX +=  (element.width + 15);
					if (tmpX >= GameConfig.stageWidth)
					{
						tmpX = (GameConfig.stageWidth - 5 * 108 - 4 * 15) / 2;
						scroStartY += element.height + 15;
						element.x = tmpX + element.width/2;
						element.y = scroStartY+element.height/2;
						tmpX +=  (element.width+15);
					}
					//egret.Tween.get(element,{loop:false}).wait(100*index).to({scaleX:1.2,scaleY:1.2},200).to({scaleX:1.0,scaleY:1.0},50);
					rewardNode.addChild(element);
				}
			}
		}

		let scrollView = ComponentManager.getScrollView(rewardNode,rect);
        scrollView.horizontalScrollPolicy = "off";
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scrollView, tipTxt, [0,tipTxt.textHeight+15]);
        this.addChildToContainer(scrollView);

        let okBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"sysConfirm",this.hide,this);
        okBtn.x = (GameConfig.stageWidth - okBtn.width) / 2;
        okBtn.y = scrollView.y + scrollView.height + 20;
        // okBtn.alpha = 0;
        // egret.Tween.get(okBtn,{loop:false}).wait(waitT).to({alpha:1},500);
        this.addChildToContainer(okBtn);

        // this.doWaitAni(okBtn,waitT);
    }

    protected doWaitAni(tmpNode:egret.DisplayObject,waitT:number)
    {
        tmpNode.alpha = 0;
        egret.Tween.get(tmpNode,{loop:false}).wait(waitT).to({alpha:1},500);
    }

    protected getShowHeight():number
	{
        let re_data = this.param.data.isauto ? this.param.data.rewardsarr : this.param.data.rewards.split('|'); 
        //"6_1150_4|6_1710_1";
        return re_data.length > 5 ? 430 : 330
	}

    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"tailor_get_light",`tombfighttitle-1`
		]);
    }
    
    protected isTouchMaskClose() : boolean{
        return true;
    }
   
    public dispose()
    {

        super.dispose()
    }
}
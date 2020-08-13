/**
 * 区服活动排名
 * author qianjun
 */
class AcConquerMainLandAddPreviewView extends PopupView{
	// 滑动列表

	public constructor(){
		super();
	}
	
	private getUiCode():string{
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
	
	private get cfg() : Config.AcCfg.ConquerMainLandCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcConquerMainLandVo{
        return <AcConquerMainLandVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
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
	

	
	protected isHaveTitle():boolean{
		return true;
	}
	public initView():void
	{		
		let view = this;
		let code = view.getUiCode();

		let contentBg = BaseBitmap.create("public_9v_bg12");
		contentBg.width = view.getShowWidth();
		contentBg.height = view.getShowHeight() -188;
		contentBg.x = view.viewBg.x + view.viewBg.width/2 - contentBg.width/2;
		contentBg.y = 75;
		view.addChildToContainer(contentBg);

		let titleTxt1 = ComponentManager.getTextField(LanguageManager.getlocal(`acConquerAddPreviewTopName1-${code}`), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTxt1.x = this.x + 120;
        titleTxt1.y = this.y + 30;
        view.addChildToContainer(titleTxt1);

        let titleTxt2 = ComponentManager.getTextField(LanguageManager.getlocal(`acConquerAddPreviewTopName2-${code}`), titleTxt1.size, TextFieldConst.COLOR_LIGHT_YELLOW)
        titleTxt2.x = this.x + 220;
        titleTxt2.y = titleTxt1.y;
		view.addChildToContainer(titleTxt2);

		let titleTxt3 = ComponentManager.getTextField(LanguageManager.getlocal(`acConquerAddPreviewTopName3-${code}`), titleTxt1.size, TextFieldConst.COLOR_LIGHT_YELLOW)
		titleTxt3.x = this.x + 400;
        titleTxt3.y = titleTxt1.y;
		view.addChildToContainer(titleTxt3);

		let rankList:any = view.cfg.servantAttBuff;
		let arr = [];
		for(let i in rankList){
			let unit = rankList[i];
			unit.pos = [
				{width : titleTxt1.textWidth, x : titleTxt1.x - 30}, 
				{width : titleTxt2.textWidth, x : titleTxt2.x - 30},
				{width : titleTxt3.textWidth, x : titleTxt3.x - 30}, 
			];
			arr.push(unit);
		}
		// let rankInfo = view.vo.getRankInfo();
		// if(rankInfo.rankList && rankInfo.rankList.length){
		// 	rankList = rankInfo.rankList;
		// }
		let rect2 = egret.Rectangle.create();
		rect2.setTo(0,0,contentBg.width,contentBg.height - 10);
        let scrollList = ComponentManager.getScrollList(AcConquerMainLandAddPreviewItem,arr,rect2,{aid:this.aid,code:this.code});
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, contentBg, [0,0]);
		view.addChildToContainer(scrollList);
        scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"),TextFieldConst.COLOR_BROWN_NEW);
	}
	


	protected getShowWidth():number{
		return 530;
	}

	protected getShowHeight():number{
		return 798;
	}
	
	protected getTitleStr():string{
		return 'acConquerAddPreviewViewTitle-'+this.code;
	}


	public hide():void{
		super.hide();
	}


	public dispose():void{
		let view = this;
		super.dispose();
	}
}
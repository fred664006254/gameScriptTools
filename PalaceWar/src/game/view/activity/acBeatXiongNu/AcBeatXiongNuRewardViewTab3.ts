class AcBeatXiongNuRewardViewTab3 extends CommonViewTab{  

	public constructor(data) 
	{
		super();
		this.param = data;
		this.initView();
	}
	private get cfg() : Config.AcCfg.BeatXiongNuCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcBeatXiongNuVo{
        return <AcBeatXiongNuVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
	}
	
	private get aid() : string{
		return `${this.param.data.aid}`;
	}
  
	private get code() : string{
		return `${this.param.data.code}`;
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

    protected initView():void{
		let view = this;
		view.height = 675;
		view.width = 532;

		let Bg = BaseBitmap.create("public_9_bg4");
		Bg.width = 530;
		Bg.height = 675;
 		Bg.x = 26;
        Bg.y = 74;
		view.addChild(Bg);
		
		let code = view.getUiCode();
		let topbg = BaseBitmap.create(App.CommonUtil.getResByCode(`beatxiongnurewardtopbg`, code));
		view.addChild(topbg);
		topbg.width = 532;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topbg, Bg, [0,3]);

		// if(this.cfg.corePrize){
		// 	let wcfg = Config.WifeskinCfg.getWifeCfgById(this.cfg.corePrize);
		// 	let wife = BaseLoadBitmap.create(wcfg.body);
		// 	wife.width = 640;
		// 	wife.height = 840;
		// 	wife.setScale(0.3);
		// 	view.addChild(wife);
		// 	App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, wife, topbg, [0,6]);
		// }
        let rewardArr =  GameData.formatRewardItem(view.cfg.getWealthGod());
        let scroStartY = topbg.y + topbg.height + 10;
		let len = Math.min(5, rewardArr.length);
		let scale = 0.85;
        let tmpX = Bg.x + (Bg.width - len * 108 * scale - (len - 1) * 7) / 2;
        for (let index = 0; index < rewardArr.length; index++) {
            let iconItem = GameData.getItemIcon(rewardArr[index],true,true);
            iconItem.setScale(scale);
            iconItem.x = tmpX;
            iconItem.y = scroStartY;
            tmpX += (iconItem.width * iconItem.scaleX +7);
            if ((tmpX - Bg.x)> Bg.width)
            {
                tmpX = Bg.x + (Bg.width - len * 108 * scale - (len - 1) * 7) / 2;
                scroStartY += (iconItem.height * iconItem.scaleX) + 8;
                iconItem.x = tmpX;
                iconItem.y = scroStartY;
                tmpX += (iconItem.width  * iconItem.scaleX +7);
            }
            this.addChild(iconItem);
        }
	}
	
    public dispose(): void {
		let view = this;
		super.dispose();
	}
}

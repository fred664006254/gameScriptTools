/**
 * author:qianjun
 * desc:规则详情弹窗
*/
class AcCrossServerServantDetailView extends PopupView
{
	private _ruleBg : BaseBitmap = null;
	public constructor() {
		super();
	}

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			
		]);
	}

	protected getTitleStr():string
	{
		return "atkracecrossDetailTitle";
	}
	
	private get api() : AcCrossServerServantVoApi{
        return Api.crossServerServantVoApi;
    }

	protected initView():void
	{
		let view = this;
		view.width = 558;
		view.height = 567;
		let ruleBg : BaseBitmap = BaseBitmap.create("crossservantrulebg");
		ruleBg.setPosition(view.viewBg.width/2 - ruleBg.width/2, 12);
		view.addChildToContainer(ruleBg);
		view._ruleBg = ruleBg; 

		view.createVS(1);
		view.createVS(2);

		let vbsg : BaseBitmap = BaseBitmap.create("crossservantrulevs");
		view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, vbsg, ruleBg);
		view.addChildToContainer(vbsg);

		let bottombg : BaseBitmap = BaseBitmap.create("public_9_bg44");
		bottombg.width = 516;
		bottombg.height = 183;
		view.setLayoutPosition(LayoutConst.horizontalCentertop, bottombg, ruleBg, [0, ruleBg.height + 20]);
		view.addChildToContainer(bottombg);

		let dateTxt= ComponentManager.getTextField(LanguageManager.getlocal('acDoubleSeventhTime', [view.api.acTimeAndHour]), 20, TextFieldConst.COLOR_WARN_GREEN);
		view.setLayoutPosition(LayoutConst.lefttop, dateTxt, bottombg, [50,15]);
		view.addChildToContainer(dateTxt);
		
		let zid_arr = view.api.getCrossServer();
		let serveStr = '';
		let temp = [];
		for(let i in zid_arr){
			let zidname = Api.mergeServerVoApi.getAfterMergeSeverName(null,true, Number(zid_arr[i]));
			if(temp.indexOf(zidname) == -1){
				temp.push(zidname);
				serveStr += (zidname + ('、'))
			}
		}
		serveStr = serveStr.substring(0,serveStr.length - 1);
		let joinTxt= ComponentManager.getTextField(LanguageManager.getlocal('crossserverJoinList', [serveStr]), 20, TextFieldConst.COLOR_WARN_GREEN);
		view.setLayoutPosition(LayoutConst.lefttop, joinTxt, dateTxt, [0,dateTxt.textHeight + 10]);
		view.addChildToContainer(joinTxt);

		let ruleTxt= ComponentManager.getTextField(LanguageManager.getlocal('crossserverRule'), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
		ruleTxt.width = 420;
		ruleTxt.lineSpacing = 5;
		view.setLayoutPosition(LayoutConst.lefttop, ruleTxt, joinTxt, [0,joinTxt.textHeight + 10]);
		view.addChildToContainer(ruleTxt);
	}

	private createVS(area):void{
		let view = this;
		//门客图像
		let cfg = Config.ServantskinCfg.getServantSkinItemById(view.api.getVsServantSkin(area));
		//门客图像
		let man = BaseLoadBitmap.create(cfg.body, null, {
            callback : ()=>{
				man.scaleX = -0.6;
				man.scaleY = 0.6;
                man.mask = new egret.Rectangle(0,0,405,467);
                view.setLayoutPosition(area == 1 ? LayoutConst.leftbottom : LayoutConst.rightbottom, man, view._ruleBg, [area == 1 ? 250 : 250,5]);
                view.addChildToContainer(man);
                //名字背景
                let zchiImg = BaseBitmap.create('crossservantnamebg');
                view.setLayoutPosition(area == 1 ? LayoutConst.lefttop : LayoutConst.righttop, zchiImg, man, [-230,10]);
                view.addChildToContainer(zchiImg);

				
                //名字
				let nameTxt= ComponentManager.getTextField(Config.ServantCfg.getServantItemById(view.api.getVsServant(area)).name, 20);

				if(PlatformManager.checkIsTextHorizontal())
				{
					zchiImg.width = nameTxt.width + 20;
					if(area == 1)
					{
						zchiImg.setPosition(this._ruleBg.x + 6,this._ruleBg.y + 10);
						nameTxt.setPosition(zchiImg.x + 5,zchiImg.y + zchiImg.height / 2 - nameTxt.height / 2);
					}
					else
					{
						zchiImg.anchorOffsetX = zchiImg.width / 2;
						zchiImg.anchorOffsetY = zchiImg.height / 2;
						zchiImg.rotation = 180;
						zchiImg.setPosition(this._ruleBg.x + this._ruleBg.width - zchiImg.width / 2 - 6,this._ruleBg.y + 10 + zchiImg.height / 2);
						nameTxt.setPosition(zchiImg.x + zchiImg.width / 2 - nameTxt.width - 5,zchiImg.y - nameTxt.height / 2);

					}
				}
				else
				{
					nameTxt.width = 20;
					view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, nameTxt, zchiImg);
				}
				
                view.addChildToContainer(nameTxt);
            },
            callbackThisObj : view
		});
	}

	protected getBgExtraHeight():number
	{
		return 20;
	}

	public dispose():void
	{
		super.dispose();
	}
}
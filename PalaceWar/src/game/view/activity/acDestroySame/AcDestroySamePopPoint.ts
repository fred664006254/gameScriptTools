/**
 * 南瓜节点
 * author 陈可
 * date 2017/9/22
 * @class ScrollListItem
 */
class AcDestroySamePopPoint extends BaseDisplayObjectContainer{
	private _idx : number = 0;
	private aid = ``;
	private code = ``;
	private _select : BaseLoadBitmap = null;
	private _calin : boolean = false;

	public constructor(){
		super();
	}

	private get cfg() : Config.AcCfg.DestroySameCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcDestroySameVo{
        return <AcDestroySameVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
	}
	
	    protected getUiCode():string{
        let code = '';
        switch(Number(this.code)){
            case 1:
            case 2:
                code = `1`;
                break;
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
            case 11:
			case 12:
            case 13:
                code = `4`;
                break;
            default:
                code = this.code;
                break;
        }
        return code;
    }
	

	public init(id : number, aid, code, type:number=0):void{
		this._idx = id;
		this.aid = aid;
		this.code = code;
		this.width = 108;
		this.height = 108;
	
		let uicode = this.getUiCode();
		let pos = this.getPoint();
		if(!type){
			type = this.vo.getPopPos(pos.x, pos.y);
		}

		let typecolor = type;
		/*
		4 蓝橙黄
		5 黄紫蓝
		6 橙黄紫
		7 紫蓝橙
		**/
		// if(Number(uicode) == 4){
		// 	let color = [];
		// 	switch(Number(code)){
		// 		case 4:
		// 		case 5:
		// 			color = [3,1,2];
		// 			break;
		// 		case 6:
		// 		case 7:
		// 			color = [2,4,3];
		// 			break;
		// 		case 8:
		// 		case 9:
		// 			color = [1,2,4];
		// 			break;
		// 		case 10:
		// 		case 11:
		// 			color = [4,3,1];
		// 			break;
		// 	}
		// 	typecolor = color[type - 1];
		// }

		let cardbg = BaseLoadBitmap.create(App.CommonUtil.getResByCode(`destroysameiconbg${typecolor}`, uicode));
		cardbg.width = 108;
		cardbg.height = 108;
		this.addChild(cardbg);
		cardbg.name = `cardbg`;

		let cardpop = BaseBitmap.create(App.CommonUtil.getResByCode(`destroyicon${typecolor}`, uicode));
		this.addChild(cardpop);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, cardpop, cardbg);
		cardpop.name = `cardpop`;

		let select = BaseLoadBitmap.create(`destroysameiconselect`);
		select.width = 134;
		select.height = 134;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, select, cardbg);
		this.addChild(select);
		select.visible = false;
		this._select = select;
		select.touchEnabled = false;

		this.addTouchTap(this.touchPoint, this, null);
	}

	//获取横纵坐标
	public getPoint():{x : number, y : number}{
		return {
			x : Math.ceil(this._idx / 3),
			y : this._idx % 3 == 0 ? 3 : this._idx % 3,
		}
	}

	public setSelect(flag : boolean):void{
		this._select.visible = flag;
		this._select.alpha =1;
		if(flag){
			egret.Tween.removeTweens(this._select);
			egret.Tween.get(this._select, {loop : true}).to({alpha : 0}, 800).to({alpha : 1},800).wait(100);
		}
	}

	public setInCal(flag : boolean):void{
		this._calin = flag;
	}

	public getInCal():boolean{
		return this._calin;
	}

	//选中的区域南瓜播放碎裂效果
	public showEffect(func:any, obj:any):void{
		let view = this;
		let framnum = 11;
		let tmpW = 400;
		let tmpH = 350;
		if(Number(this.getUiCode()) == 3){
			framnum = 7;
			tmpW = 300;
			tmpH = 300;
		}
		if(Number(this.getUiCode()) == 4){
			framnum = 10;
			tmpW = 250;
			tmpH = 280;
		}
		let posuigame = Number(this.getUiCode()) < 3 ? `destroysameposui` : `destroysameposui-${this.getUiCode()}`
		let clip = ComponentManager.getCustomMovieClip(posuigame, framnum);
		clip.width = tmpW;
		clip.height = tmpH;
		clip.anchorOffsetX = clip.width / 2;
		clip.anchorOffsetY = clip.height / 2;
		this.addChild(clip);
		clip.x = 50;
		clip.y = 110;
		if(Number(this.getUiCode()) == 3){
			clip.x = 62;
			clip.y = 60;
		}
		if(Number(this.getUiCode()) == 4){
			clip.x = 43;
			clip.y = 95;
		}
		clip.playWithTime(1);

		let cardbg = view.getChildByName(`cardbg`);
		let cardpop = view.getChildByName(`cardpop`);
		egret.Tween.removeTweens(this._select);
		let flash = BaseBitmap.create(`destroysameposuiflash`);
		this.addChild(flash);
		flash.touchEnabled = false;
		flash.alpha = 0;
		flash.blendMode = egret.BlendMode.ADD;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, flash, cardbg);
		if(Number(this.getUiCode()) == 4){
			egret.Tween.get(flash).to({alpha : 1}, 200).call(()=>{
				flash.alpha = 0;
				cardbg.alpha = cardpop.alpha = this._select.alpha = 0;
				egret.Tween.removeTweens(flash);
				flash.dispose()
				flash = null;
			}, view);
		}
		else{
			cardbg.alpha = cardpop.alpha = this._select.alpha = 0;
		}
		clip.setEndCallBack(()=>{
			clip.dispose();
			clip = null;
			func.apply(obj);
		}, view);
		// func.apply(obj);
	}

	public getSelect():boolean{
		return this._select.visible;
	}

	public touchPoint():void{
		let baseview = <AcDestroySameView>ViewController.getInstance().getView(`AcDestroySameView`);
		if(baseview && baseview.getStop()){
			return;
		}
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ACDESTORYSAME_MAKELINE, 0);
		this.vo.pointidx = this._idx;
		this.makeLinePoint();
		this._select.visible = true;
	}

	//获取可消除区域
	public makeLinePoint():void{
		let view = this;
		view._calin = true;
		let pos = this.getPoint();
		let type = this.vo.getPopPos(pos.x, pos.y);
		//上下左右 四个方向
		let arr = [
			{
				x : pos.x, y : pos.y - 1
			},
			{
				x : pos.x, y : pos.y + 1
			},
			{
				x : pos.x - 1, y : pos.y
			},
			{
				x : pos.x + 1, y : pos.y
			}
		];
		//let mainview = <AcDestroySameView>ViewController.getInstance().getView(`AcDestroySameView`);
		for(let i in arr){
			let unit = arr[i];
			let unittype = this.vo.getPopPos(unit.x, unit.y);
			if(unittype == type){
				view._select.visible = true;
				let id = (unit.x - 1) * 3 + unit.y;
				App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ACDESTORYSAME_MAKELINE, id);
			}
		}
	}

	public dispose():void{
		this._idx = 0;
		this._select = null;
		this._calin = false;
		this.removeTouchTap();
		super.dispose();
	} 
}
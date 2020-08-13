/**
 * 场景奖励预览
 * author qianjun
 */
class AcNewYearCrackerScenePopupView extends PopupView
{
	public constructor(){
		super();
	}
	
	private get cfg() : Config.AcCfg.NewYearCrackerCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	
    private get vo() : AcNewYearCrackerVo{
        return <AcNewYearCrackerVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get code():string{
        return this.param.data.code;
    }

    private get aid():string{
        return this.param.data.aid;
	}

	private _sceneBg : BaseBitmap = null;
	private _mask : BaseBitmap = null;
	private _curIdx = 1;
	private _switchDelta = 0;
	private _bgArr = [];
	private _stop = false;
	private _effectScene : SceneEffect = null;

	protected getResourceList():string[]{
		return super.getResourceList().concat([
			`accrackertscenebg1-${this.code}`,'servant_detailBtn',`accrackertscenebg2-${this.code}`,`accrackertscenebg3-${this.code}`,`accrackertscenebg4-${this.code}`,
			`accrackertscenemask1-${this.code}`,`accrackertscenemask2-${this.code}`,`accrackertscenemask3-${this.code}`,`accrackertscenemask4-${this.code}`,
		]);
    }

	public initView():void{		
		// let tabName = ["acPunishRankRewardTab1"];
		let view = this;
		view._stop = false;
		view._curIdx = 1;
		let scenebg = BaseBitmap.create(`accrackertscenebg1-${view.code}`);
		scenebg.setPosition(this.viewBg.x + this.viewBg.width / 2 - scenebg.width / 2,0);
		view.addChildToContainer(scenebg);
		view._sceneBg = scenebg;

		let detailBtn = ComponentManager.getButton("servant_detailBtn","",view.detailBtnHandler,view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, detailBtn, scenebg, [5,35]);
        view.addChildToContainer(detailBtn);
		
		let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acNewYearCrackerSceneTip1-${view.code}`), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
		view.addChildToContainer(tipTxt);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, scenebg, [0,5]);

		let line = BaseBitmap.create(`public_line3`);
		line.width = 400;
		view.addChildToContainer(line);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, line, tipTxt, [0,tipTxt.textHeight + 15]);

		let tipTxt2 = ComponentManager.getTextField(LanguageManager.getlocal(`acNewYearCrackerSceneTip2-${view.code}`), 22, TextFieldConst.COLOR_WHITE);
		view.addChildToContainer(tipTxt2);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tipTxt2, line);

		let tipTxt3 = ComponentManager.getTextField(LanguageManager.getlocal(`acNewYearCrackerSceneTip3-${view.code}`), 20, TextFieldConst.COLOR_WHITE);
		view.addChildToContainer(tipTxt3);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt3, tipTxt2, [0,tipTxt2.textHeight + 5]);

		let tipTxt4 = ComponentManager.getTextField(LanguageManager.getlocal(`acNewYearCrackerSceneTip4-${view.code}`), 20, TextFieldConst.COLOR_WHITE);
		view.addChildToContainer(tipTxt4);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, tipTxt4, scenebg, [0,10]);

		// let time1 = BaseBitmap.create(`accrackertime1-${view.code}`);
		// time1.name = `time1`;
		// view.addChildToContainer(time1);
		// App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, time1, bg, [145,130]);

		// let time2 = BaseBitmap.create(`accrackertime2-${view.code}`);
		// time2.name = `time2`;
		// view.addChildToContainer(time2);
		// App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, time2, bg, [100,130]);

		// let time3 = BaseBitmap.create(`accrackertime3-${view.code}`);
		// time3.name = `time3`;
		// view.addChildToContainer(time3);
		// App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, time3, bg, [55,130]);

		let time = BaseBitmap.create(`accrackertime1-${view.code}`);
		time.name = `time`;
		view.addChildToContainer(time);
		App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, time, scenebg, [10,130]);

		view.container.mask = new egret.Rectangle(10+GameData.popupviewOffsetX,0,570,731);
		//添加动画
		let effectLayer = new SceneEffect();
		effectLayer.setScale(0.88);
		effectLayer.x = 0+GameData.popupviewOffsetX;
		effectLayer.y = -15;
		view.addChildToContainer(effectLayer);
		view._effectScene = effectLayer;

		let mask = BaseBitmap.create(`accrackertscenemask${view._curIdx}-${this.code}`);
		mask.x = 11+GameData.popupviewOffsetX;
		mask.y = 323;
		view.addChildToContainer(mask);
		view._mask = mask;

		let arrow_leftBtn = ComponentManager.getButton("btn_leftpage", "", view.switchHandler, view, ["left"]);
		App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, arrow_leftBtn, scenebg, [85,45]);
		view.addChildToContainer(arrow_leftBtn);

		let arrow_rightBtn = ComponentManager.getButton("btn_leftpage","",view.switchHandler, view, ["right"]);
        arrow_rightBtn.anchorOffsetX = arrow_rightBtn.width / 2;
        arrow_rightBtn.scaleX = -1;
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, arrow_rightBtn, scenebg, [85,45]);
		view.addChildToContainer(arrow_rightBtn);

		view._bgArr = [1,2,3,4];

		let btn1 = BaseBitmap.create(`accrackerscenebtn1-${view.code}`);
		let btn2 = BaseBitmap.create(`accrackerscenebtn1-${view.code}`);
		let btn3 = BaseBitmap.create(`accrackerscenebtn1-${view.code}`);
		let btn4 = BaseBitmap.create(`accrackerscenebtn1-${view.code}`);
		let tmpX = (scenebg.width - btn1.width * 4 - 10 * 3)/2;
		view.addChildToContainer(btn1);
		view.addChildToContainer(btn2);
		view.addChildToContainer(btn3);
		view.addChildToContainer(btn4);
		btn1.name = `btn1`;
		btn2.name = `btn2`;
		btn3.name = `btn3`;
		btn4.name = `btn4`;
		
		App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, btn1, scenebg, [tmpX,55]);
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, btn2, btn1, [btn1.width + 10,0]);
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, btn3, btn2, [btn2.width + 10,0]);
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, btn4, btn3, [btn3.width + 10,0]);

		view.freshview();
		// let vertexSrc =
		// "attribute vec2 aVertexPosition;\n" +
		// "attribute vec2 aTextureCoord;\n" +
		// "attribute vec2 aColor;\n" +
		// "uniform vec2 projectionVector;\n" +
		// "varying vec2 vTextureCoord;\n" +
		// "const vec2 center = vec2(-1.0, 1.0);\n" +
		// "void main(void) {\n" +
		// "   gl_Position = vec4( (aVertexPosition / projectionVector) + center , 0.0, 1.0);\n" +
		// "   vTextureCoord = aTextureCoord;\n" +
		// "}";
		// let fragmentSrc =
		// "precision lowp float;\n" +
		// "varying vec2 vTextureCoord;\n" +
		// "uniform float width;\n" +
		// "uniform float height;\n" +
		// "void main(void) {\n" +
		// "vec4 fg;\n" +
		// "if(mod(floor(vTextureCoord.x / width) + floor(vTextureCoord.y / height), 2.0) == 0.0) {" +
		// "fg = vec4(1,1,1,1);" +
		// "}" +
		// "else {" +
		// "fg = vec4(0,0,0,1);" +
		// "}" +
		// "gl_FragColor = fg;\n" +
		// "}";
		// let size = 50;
		// let filter = new egret.CustomFilter(vertexSrc, fragmentSrc, { width: size / scenebg.width, height: size / scenebg.height });
		// scenebg.filters = [filter];
		egret.Tween.get(view._sceneBg,{loop : true}).wait(15000).call(()=>{
			view.switchHandler(`right`);
		},view);
	}

	private freshview():void{
		let view = this;
		let btn1 = view.container.getChildByName(`btn1`);
		let btn2 = view.container.getChildByName(`btn2`);
		let btn3 = view.container.getChildByName(`btn3`);
		let btn4 = view.container.getChildByName(`btn4`);
		let time1 = view.container.getChildByName(`time1`);
		let time2 = view.container.getChildByName(`time2`);
		let time3 = view.container.getChildByName(`time3`);
		let time4 = view.container.getChildByName(`time4`);

		for(let i = 1; i < 5; ++ i){
			let btn : any = view.container.getChildByName(`btn${i}`);
			btn.setRes(`accrackerscenebtn${view._curIdx == i ? 2 : 1}-${view.code}`);
		}

		let time : any = view.container.getChildByName(`time`);
		time.setRes(`accrackertime${view._curIdx}-${view.code}`);
		
		view._sceneBg.setRes(`accrackertscenebg${view._curIdx}-${view.code}`);
		view._mask.setRes(`accrackertscenemask${view._curIdx}-${this.code}`);

		let cId:string = `202`;
		if (Config.SceneeffectCfg.hasSceneEffect(cId)){
			//
			view._effectScene.showSceneEffect(view._curIdx.toString(), cId);
		}
	}

	private switchHandler(param : any):void{
		let view = this;
		if(view._stop){
			return;
		}
		view._stop = true;
		let oldIdx = view._curIdx;
        let newserId = 0;
        let arr = view._bgArr;
		let len = arr.length;
		for(let index = 0; index < len; index++) {
			if(arr[index] == view._curIdx){
				if(param == "left"){
					if(index == 0){
						newserId = arr[len-1];
					}else{
						newserId = arr[index-1];
					}
				}else if(param == "right"){
					if(index == len -1 ){
						newserId = arr[0];
					}else{
						newserId = arr[index+1];
					}
				}
				break;
			}
        }
        
		// if(newserId && newserId == view._curSkinId){
		// 	return;
        // }	
		view._curIdx = newserId;
		//view.freshview();
        // this.refreshBaseUIInfo(); //刷新重置id后的基础文本信息& 按钮状态
        // let tmpX = view._sceneBg.x;
		// let tarPosX1 = tmpX + 180;
		// let tarPosX2 = tmpX - 180;
		//  if(param == "left"){
        //     tarPosX1 = tmpX - 180;
		// 	tarPosX2 = tmpX + 180;
		// }
		let scenebg = BaseBitmap.create(`accrackertscenebg${oldIdx}-${view.code}`);
		//let scenebg = view._sceneBg;
		scenebg.y = view._sceneBg.y;
		scenebg.x = view._sceneBg.x;// - scenebg.width;
		view.addChildToContainer(scenebg);
		view.container.setChildIndex(scenebg,1);

		view._sceneBg.setRes(`accrackertscenebg${view._curIdx}-${view.code}`);
		// scenebg.mask = new egret.Rectangle(0,90,560,610);
		// let vertexSrc =
		// "attribute vec2 aVertexPosition;\n" +
		// "attribute vec2 aTextureCoord;\n" +
		// "attribute vec2 aColor;\n" +
		// "uniform vec2 projectionVector;\n" +
		// "varying vec2 vTextureCoord;\n" +
		// "const vec2 center = vec2(-1.0, 1.0);\n" +
		// "void main(void) {\n" +
		// "   gl_Position = vec4( (aVertexPosition / projectionVector) + center , 0.0, 1.0);\n" +
		// "   vTextureCoord = aTextureCoord;\n" +
		// "}";
		// let fragmentSrc =
		// "precision lowp float;\n" +
		// "varying vec2 vTextureCoord;\n" +
		// "uniform float width;\n" +
		// "uniform float height;\n" +
		// "void main(void) {\n" +
		// "vec4 fg;\n" +
		// "if(mod(floor(vTextureCoord.x / width) + floor(vTextureCoord.y / height), 2.0) == 0.0) {" +
		// "fg = vec4(1,1,1,1);" +
		// "}" +
		// "else {" +
		// "fg = vec4(0,0,0,1);" +
		// "}" +
		// "gl_FragColor = fg;\n" +
		// "}";
		// let size = 50;
		// let filter = new egret.CustomFilter(vertexSrc, fragmentSrc, { width: size / scenebg.width, height: size / scenebg.height });
		// scenebg.filters = [filter];
		view._mask.alpha = 0;
		view._effectScene.alpha = 0;
		egret.Tween.get(scenebg).wait(100).call(()=>{
			view.freshview();
		},view);

		egret.Tween.get(scenebg).to({alpha : 0},800).
        wait(100).
        call(()=>{
			egret.Tween.removeTweens(scenebg);
			view.container.removeChild(scenebg);
			view._stop = false;
			view._mask.alpha = 1;
			view._effectScene.alpha = 1;
		},view);
    }

	private detailBtnHandler():void{
		ViewController.getInstance().openView(ViewConst.POPUP.CHANGEBGDETAILPOPUPVIEW,{
			scene:'cityScene', 
			key:'202',
		});
	}
	
	protected getShowHeight():number{
		return 795+10;
	}

	protected getShowWidth():number{
		return 560;
	}

	protected getTitleStr():string{
		return `acTreasureOfficeTitle-${this.code}`;
	}

	public dispose():void{
		let view = this;
		egret.Tween.removeTweens(view._sceneBg);
		view._sceneBg = null;
		view._curIdx = 1;
		view._bgArr = [];
		view._stop = false;
		view._effectScene = null;
		view._mask = null;
		super.dispose();
	}
}
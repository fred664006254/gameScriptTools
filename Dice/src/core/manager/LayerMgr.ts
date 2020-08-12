/**
 * 图层管理
 * author 陈可
 * date 2017/9/8
 * @class LayerManager
 */
namespace LayerMgr 
{
	/** 
	 * 游戏的Main类
	 */
	export let mainIns:egret.DisplayObjectContainer=undefined;
	/**
	 * 场景，地图，建筑等最底层图层
	 */
	export let bgLayer:BaseDisplayObjectContainer=undefined;

	/**
	 * 主UI等标题栏，菜单栏等界面图层
	 */
	export let uiLayer:BaseDisplayObjectContainer=undefined;

	/**
	 * 功能界面图层
	 */
	export let panelLayer:BaseDisplayObjectContainer=undefined;

	/**
	 * loading，全屏遮罩图层
	 */
	export let maskLayer:BaseDisplayObjectContainer=undefined;

	/**
	 * 引导层级
	 */
	export let guideLayer:BaseDisplayObjectContainer=undefined;

	/**
	 * 提示，警告等游戏提示图层
	 */
	export let msgLayer:BaseDisplayObjectContainer=undefined;

	/**
	 * 初始化游戏图层
	 * @param layerContiner 图层父容器
	 */
	export function initLayer(layerContiner:egret.DisplayObjectContainer):void
	{
		mainIns = layerContiner;
		bgLayer=new BaseDisplayObjectContainer();
		uiLayer=new BaseDisplayObjectContainer();
		panelLayer=new BaseDisplayObjectContainer();
		maskLayer=new BaseDisplayObjectContainer();
		guideLayer=new BaseDisplayObjectContainer();
		msgLayer=new BaseDisplayObjectContainer();

		layerContiner.addChild(bgLayer);
		layerContiner.addChild(uiLayer);
		layerContiner.addChild(panelLayer);
		layerContiner.addChild(maskLayer);
		layerContiner.addChild(guideLayer);
		layerContiner.addChild(msgLayer);

		if(App.DeviceUtil.checkIsFullscreen())
		{
			let layerY:number=(GameConfig.stage.stageHeight-GameConfig.stageHeigth)*0.5;
			bgLayer.y=layerY;
			uiLayer.y=layerY;
			panelLayer.y=layerY;
			maskLayer.y=layerY;
			msgLayer.y=layerY;
			guideLayer.y=layerY;
			GameData.layerPosY=layerY;
		} else if (App.DeviceUtil.checkIsIpadScreen() || GameConfig.stage.scaleMode == egret.StageScaleMode.FIXED_HEIGHT) {
			let layerX: number = (GameConfig.stage.stageWidth-GameConfig.stageWidth) / 2;
			bgLayer.x=layerX;
			uiLayer.x=layerX;
			panelLayer.x=layerX;
			maskLayer.x=layerX;
			msgLayer.x=layerX;
			guideLayer.x=layerX;
			GameData.layerPosX=layerX;
		}
		if(PlatMgr.checkIsTest()||PlatMgr.checkIsLocal())
		{
			let testTxt:BaseTextField=ComponentMgr.getTextField("T",35);
			testTxt.touchEnabled=false;
			msgLayer.addChild(testTxt);
			if((App.DeviceUtil.IsHtml5()||App.DeviceUtil.isRuntime2())&&LocalStorageMgr.get("gametest1000"))
			{
				let testSp:BaseShape=new BaseShape();
				testSp.graphics.beginFill(0,0.5);
				testSp.graphics.drawRoundRect(0,0,80,40,5,5);
				testSp.graphics.endFill();
				msgLayer.addChild(testSp);
				testSp.setPosition(0,500);
				testSp.addTouchTap((e:egret.TouchEvent)=>{
					App.CommonUtil.checkAndJumpToBack();
				},LayerMgr);
				let text:BaseTextField=ComponentMgr.getTextField("切回正式",14);
				text.setPosition(testSp.x+(testSp.width-text.width)/2,testSp.y+(testSp.height-text.height)/2);
				msgLayer.addChild(text);
			}
		}
	}
}
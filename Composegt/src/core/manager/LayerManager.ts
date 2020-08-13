/**
 * 图层管理
 * author 陈可
 * date 2017/9/8
 * @class LayerManager
 */
namespace LayerManager 
{

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
	 * 提示，警告等游戏提示图层
	 */
	export let msgLayer:BaseDisplayObjectContainer=undefined;

	/**
	 * 初始化游戏图层
	 * @param layerContiner 图层父容器
	 */
	export function initLayer(layerContiner:egret.DisplayObjectContainer):void
	{
		bgLayer=new BaseDisplayObjectContainer();
		uiLayer=new BaseDisplayObjectContainer();
		panelLayer=new BaseDisplayObjectContainer();
		maskLayer=new BaseDisplayObjectContainer();
		msgLayer=new BaseDisplayObjectContainer();

		// if(PlatformManager.checkIsFB())
		// {
		// 	let bg:BaseShape=new BaseShape();
		// 	bg.graphics.beginFill(0x131F2C);
		// 	bg.graphics.drawRect(0,0,GameConfig.stage.stageWidth,GameConfig.stage.stageHeight);
		// 	GameConfig.stage.addChildAt(bg,0);
		// }
		layerContiner.addChild(bgLayer);
		layerContiner.addChild(uiLayer);
		layerContiner.addChild(panelLayer);
		layerContiner.addChild(maskLayer);
		layerContiner.addChild(msgLayer);

		if(App.DeviceUtil.checkIsFullscreen())
		{
			let layerY:number=(GameConfig.stage.stageHeight-GameConfig.stageHeigth)*0.5;
			bgLayer.y=layerY;
			uiLayer.y=layerY;
			panelLayer.y=layerY;
			maskLayer.y=layerY;
			msgLayer.y=layerY;
			GameData.layerPosY=layerY;
		}
		if(PlatformManager.checkIsTest()||PlatformManager.checkIsLocal())
		{
			let testTxt:BaseTextField=ComponentManager.getTextField("T(B包)",20);
			testTxt.touchEnabled=false;
			msgLayer.addChild(testTxt);
			if((App.DeviceUtil.IsHtml5()||App.DeviceUtil.isRuntime2())&&LocalStorageManager.get("gametest1000"))
			{
				let testSp:BaseShape=new BaseShape();
				testSp.graphics.beginFill(0,0.5);
				testSp.graphics.drawRoundRect(0,0,80,40,5,5);
				testSp.graphics.endFill();
				msgLayer.addChild(testSp);
				testSp.setPosition(0,500);
				testSp.addTouchTap((e:egret.TouchEvent)=>{
					App.CommonUtil.checkAndJumpToBack();
				},LayerManager);
				let text:BaseTextField=ComponentManager.getTextField("切回正式",14);
				text.setPosition(testSp.x+(testSp.width-text.width)/2,testSp.y+(testSp.height-text.height)/2);
				msgLayer.addChild(text);
			}
		}
	}

	export function getParentLayer(display:egret.DisplayObject):egret.DisplayObjectContainer
	{
		let stage=GameConfig.stage;
		let stageChildNum=stage.numChildren;
		for (let i = 0; i < stageChildNum; i++) 
		{
			const stageChild = stage.getChildAt(i);
			if(stageChild instanceof egret.DisplayObjectContainer)
			{
				let num=stageChild.numChildren;
				for (let index = 0; index < num; index++) {
					const displayContainer = stageChild.getChildAt(index);
					if(displayContainer instanceof egret.DisplayObjectContainer)
					{
						if(displayContainer.contains(display))
						{
							return displayContainer;
						}
					}
					
				}
			}
			
		}
		return GameConfig.stage;
	}
	/**
	 * 隐藏游戏图层
	 * 用于ar
	 */
	export function hideLayer():void
	{
		bgLayer.visible = false;
		uiLayer.visible = false;
		panelLayer.visible = false;
		msgLayer.visible = false;
		maskLayer.visible = false;
	}

	/**
	 * 显示游戏图层
	 * 用于ar
	 */
	export function showLayer():void
	{
		bgLayer.visible = true;
		uiLayer.visible = true;
		panelLayer.visible = true;
		msgLayer.visible = true;
		maskLayer.visible = true;
	}

}
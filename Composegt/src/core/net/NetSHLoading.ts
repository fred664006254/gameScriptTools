/**
 * loading、加载资源时显示，调用这个是立即显示(37审核专用)
 * author dky
 * date 2019/8/5
 * @namespace NetSHLoading
 */
namespace NetSHLoading
{
	// 当前有多少次显示loading
	let _totalNum:number = 0;
	let _container:BaseDisplayObjectContainer = null;

	let _loadingImage:BaseBitmap;
	let _loadingTween:egret.Tween;
	export function show():boolean
	{
		// App.LogUtil.log("show " + _totalNum);
		if(_totalNum > 0 ){
			_totalNum++;	
			return false;
		}
		if(_container == null)
		{
			// App.LogUtil.log("init " + _totalNum);
			_container = new BaseDisplayObjectContainer();
			let maskSp = new egret.Shape();
			maskSp.graphics.beginFill(TextFieldConst.COLOR_BLACK,0.3);
			maskSp.graphics.drawRect(0,0,GameConfig.stageWidth,GameConfig.stageHeigth);
			maskSp.graphics.endFill();
			maskSp.touchEnabled = true;
			_container.addChild(maskSp);
			
			let texture:egret.Texture=ResourceManager.getRes("loading_circle");
			if(texture)
			{
				_loadingImage = BaseBitmap.create("loading_circle");
			}
			else
			{
				let rect:egret.Rectangle=egret.Rectangle.create();
				rect.setTo(0,0,101,101);
				_loadingImage=BaseLoadBitmap.create("loading_circle",rect);
				_loadingImage.width = rect.width;
				_loadingImage.height = rect.height;
			}
			_loadingImage.x = GameConfig.stageWidth/2;
			_loadingImage.y = GameConfig.stageHeigth/2;
			_loadingImage.anchorOffsetX = _loadingImage.width/2;
			_loadingImage.anchorOffsetY = _loadingImage.height/2;
			_container.addChild(_loadingImage);

			// let loadingTF:BaseTextField = new BaseTextField();
			// loadingTF.text = LanguageManager.getlocal("netLoadingTitle");
			// loadingTF.x = GameConfig.stageWidth/2 - loadingTF.width/2;
			// loadingTF.y = _loadingImage.y + _loadingImage.height/2 + 10;
			// _container.addChild(loadingTF);


		}
		if(!LayerManager.maskLayer.contains(_container))
		{
			// App.LogUtil.log("show add " + _totalNum);
			LayerManager.maskLayer.addChild(_container);
		}
		startAnimat();
		_totalNum++;
		return true;
	}
	
	export function hideForChangeAccount():void
	{
		_totalNum=0;
		hide();
	}

	export function hide():boolean
	{
		let result:boolean=true;
		if(_totalNum > 1)
		{
			_totalNum--;
			result=false;
		}
		else
		{
			if(_container && LayerManager.maskLayer.contains(_container))
			{
				// App.LogUtil.log("hide remove " + _totalNum);
				pauseAnimat();
				LayerManager.maskLayer.removeChild(_container);
			}
			// App.LogUtil.log("hide " + _totalNum);
			_totalNum = 0;
			result=true;
		}
		return result;
	}

	export function startAnimat():void
	{
		if(_loadingTween == null)
		{
			_loadingTween = egret.Tween.get(_loadingImage,{loop:true});
			_loadingTween.to({rotation:360},1500);
		}
		else
		{
			egret.Tween.resumeTweens(_container);
		}
	}

	export function pauseAnimat():void
	{
		if(_loadingTween)
		{
			egret.Tween.pauseTweens(_container);
		}
	}
	export function dispose():void
	{
		if(_loadingTween)
		{
			egret.Tween.removeTweens(_container);
			_loadingTween=null;
		}
		if(_loadingImage)
		{
			_loadingImage = null;
		}
		if(_container)
		{
			_container.dispose();
			_container = null;
		}
		_totalNum = 0;
	}
}

/**
 * loading、加载资源时显示，调用这个是立即显示
 * author dmj
 * date 2017/9/10
 * @namespace NetLoading
 */
namespace NetLoading
{
	// 当前有多少次显示loading
	let _totalNum:number = 0;
	let _container:BaseDisplayObjectContainer = null;

	let _loadingImage:BaseBitmap;
	let _loadingImagePoint:BaseBitmap;
	let _mask:egret.Rectangle;
	let intervalHand;
	let progressValue:number=0;
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
			
			// 文字
			let loadingText: BaseLoadBitmap | BaseBitmap;
			let texture:egret.Texture=ResourceManager.getRes("loading_text");
			if(texture)
			{
				loadingText = BaseBitmap.create("loading_text");
			}
			else
			{
				let rect:egret.Rectangle=egret.Rectangle.create();
				rect.setTo(0,0,136,28);
				if(PlatformManager.checkIsViSp())
				{
					rect.setTo(0,0,240,28);
				}
				loadingText = BaseLoadBitmap.create("loading_text",rect);
				loadingText.width = rect.width;
				loadingText.height = rect.height;
			}
			loadingText.x = GameConfig.stageWidth/2;
			loadingText.y = GameConfig.stageHeigth/2-30;
			loadingText.anchorOffsetX = loadingText.width/2;
			loadingText.anchorOffsetY = loadingText.height/2;
			_container.addChild(loadingText);
			if(PlatformManager.checkIsMwSp())
			{
				loadingText.visible = false;
			}
			
			// 进度条背景
			let loading_bg: BaseLoadBitmap | BaseBitmap;
			let textureBg:egret.Texture=ResourceManager.getRes("loading_bg");
			if(textureBg)
			{
				loading_bg = BaseBitmap.create("loading_bg");
			}
			else
			{
				let rect:egret.Rectangle=egret.Rectangle.create();
				rect.setTo(0,0,438,13);
				loading_bg=BaseLoadBitmap.create("loading_bg",rect);
				loading_bg.width = rect.width;
				loading_bg.height = rect.height;
			}

			loading_bg.x = GameConfig.stageWidth/2;
			loading_bg.y = GameConfig.stageHeigth/2;
			loading_bg.anchorOffsetX = loading_bg.width/2;
			loading_bg.anchorOffsetY = loading_bg.height/2;
			_container.addChild(loading_bg);

			// 进度条
			let textureprogress:egret.Texture=ResourceManager.getRes("loading_progress");
			if(textureprogress)
			{
				_loadingImage = BaseBitmap.create("loading_progress");
			}
			else
			{
				let rect:egret.Rectangle=egret.Rectangle.create();
				rect.setTo(0,0,438,13);
				_loadingImage = BaseLoadBitmap.create("loading_progress",rect);
				_loadingImage.width = rect.width;
				_loadingImage.height = rect.height;
			}

			_loadingImage.x = GameConfig.stageWidth/2 - _loadingImage.width/2;
			_loadingImage.y = GameConfig.stageHeigth/2;
			// _loadingImage.anchorOffsetX = _loadingImage.width/2;
			_loadingImage.anchorOffsetY = _loadingImage.height/2;
			_container.addChild(_loadingImage);

			// 光点
			let texturePoint:egret.Texture=ResourceManager.getRes("light_point");
			if(texturePoint)
			{
				_loadingImagePoint = BaseBitmap.create("light_point");
			}
			else
			{
				let rect:egret.Rectangle=egret.Rectangle.create();
				rect.setTo(0,0,22,54);
				_loadingImagePoint=BaseLoadBitmap.create("light_point",rect);
				_loadingImagePoint.width = rect.width;
				_loadingImagePoint.height = rect.height;
			}

			_loadingImagePoint.x = GameConfig.stageWidth/2;
			_loadingImagePoint.y = GameConfig.stageHeigth/2;
			_loadingImagePoint.anchorOffsetX = _loadingImagePoint.width/2;
			_loadingImagePoint.anchorOffsetY = _loadingImagePoint.height/2;
			_container.addChild(_loadingImagePoint);
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
		if(intervalHand == null)
		{
			intervalHand = setInterval(()=>{
				progressValue += 1;
				if (progressValue >= 100) {
					progressValue = 0;
				}
				if (!_mask) {
					_mask = new egret.Rectangle(0, 0, _loadingImage.width * (progressValue/100), _loadingImage.height);
				}
				else
				{
					_mask.setTo(0, 0, _loadingImage.width * (progressValue/100), _loadingImage.height);
				}
				_loadingImage.mask = _mask;
				// _loadingImage.x = GameConfig.stageWidth/2 - _loadingImage.width/2;
				_loadingImagePoint.x = _loadingImage.x + _loadingImage.width * progressValue / 100;
			}, 800/100);
		}
	}

	export function pauseAnimat():void
	{
		if(intervalHand)
		{
			window.clearInterval(intervalHand);
			intervalHand=null;
		}
	}
	export function dispose():void
	{
		if(intervalHand)
		{
			egret.Tween.removeTweens(_container);
			intervalHand=null;
		}
		if(_loadingImage)
		{
			_loadingImage = null;
		}
		if(_loadingImagePoint)
		{
			_loadingImagePoint = null;
		}
		if(_mask)
		{
			_mask = null;
		}

		if(_container)
		{
			_container.dispose();
			_container = null;
		}
		_totalNum = 0;
	}
}
/**
 * 加载资源或者请求时候调用，添加延迟后调用loading，默认500毫秒，show和mask必须一一对应
 */
namespace NetLoadingWait
{
	export function showMask(waitTime?:number):LoadingWait
	{
		let loadingWait:LoadingWait=new LoadingWait();
		loadingWait.showMask(waitTime);
		return loadingWait;
	}
	// export function hideMask(loadingWait:LoadingWait):void
	// {
	// 	loadingWait.hideMask();
	// }
	export class LoadingWait
	{
		private waitShowLoadingTime:number=500;
		private waitTimeOut:number=-1;
		private isLoadingShowed:boolean=false;
		private waitMask:BaseBitmap;
		public showMask(waitTime?:number):void
		{
			if(!this.waitMask)
			{
				this.waitMask=BaseBitmap.create("public_alphabg");
				this.waitMask.width=GameConfig.stageWidth;
				this.waitMask.height=GameConfig.stageHeigth;
				this.waitMask.touchEnabled=true;
			}
			if(!LayerManager.maskLayer.contains(this.waitMask))
			{
				LayerManager.maskLayer.addChild(this.waitMask);
				if(this.waitTimeOut<0)
				{
					this.waitShowLoadingTime=waitTime?waitTime:this.waitShowLoadingTime;
					this.waitTimeOut=egret.setTimeout(() =>{
						NetLoading.show();
						this.isLoadingShowed=true;
						egret.clearTimeout(this.waitTimeOut);
						this.waitTimeOut=-1;
					}, this, this.waitShowLoadingTime);
				}
			}
		}
		public hideMask():void
		{
			if(this.waitMask&&LayerManager.maskLayer.contains(this.waitMask))
			{
				LayerManager.maskLayer.removeChild(this.waitMask);
			}
			if(this.waitTimeOut>-1)
			{
				egret.clearTimeout(this.waitTimeOut);
				this.waitTimeOut=-1;
			}
			if(this.isLoadingShowed)
			{
				NetLoading.hide();
				this.isLoadingShowed=false;
			}
		}

		public dispose():void
		{
			this.hideMask();
			if(this.waitMask)
			{
				this.waitMask.dispose();
				BaseBitmap.release(this.waitMask);
				this.waitMask=null;
			}
		}
	}
}
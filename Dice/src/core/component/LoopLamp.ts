/**
 * 循环跑马灯
 * author dky
 * date 2017/11/23
 * @class LoopLamp
 */
class LoopLamp extends BaseDisplayObjectContainer
{
	private _tfPool:Array<BaseTextField>;
	private _stringList:Array<string>;
	private _speed:number;

	public constructor(stringList : string[], style : string = LayoutConst.horizontalCenter) {
		super();
		this._stringList = stringList;
		this.init(style);
	}

	private init(style : string):void
	{	
		this._speed = GameConfig.stageWidth / 6000;
		this._tfPool = new Array<BaseTextField>();
		
		this.loadString(style);
		
	}

	private loadString(style : string)
	{
		if(this._stringList.length <= 0){
			return;
		}
		let tf:BaseTextField;

		if(this._tfPool[0]){
			tf = this._tfPool.shift();
		}else{
			tf = ComponentMgr.getTextField("", TextFieldConst.SIZE_CONTENT_COMMON);
		}

		tf.text = this._stringList[0];
		let str1 = this._stringList.shift()
		this._stringList.push(str1)
		this.addChild(tf);
		
		let self = this;
		//水平 从左到右
		if(style == LayoutConst.horizontalCenter){
			tf.x = GameConfig.stageWidth;
			//第一段时间
			let time1 = (tf.width + 50)/this._speed;
			//第二段时间
			let time2 = (GameConfig.stageWidth - 50)/this._speed;
			egret.Tween.get(tf)
			.to({x:GameConfig.stageWidth - tf.width - 50},time1)
			.call(function(){
				self.loadString(style);
			},this)
			.to({x:-(tf.width)},time2)
			.call(function(tf:BaseTextField){
				egret.Tween.removeTweens(tf);
				self._tfPool.push(tf);
				if(tf.parent){
					tf.parent.removeChild(tf);
				}
			},this,[tf])
		}
		//垂直 从下到上
		else if(style == LayoutConst.verticalCenter){
			tf.width = GameConfig.stageWidth;
			tf.x = 0;
			// this._speed = tf.textHeight / 100;
			tf.y = tf.textHeight;
			tf.alpha = 0;
			egret.Tween.get(tf)
			.to({y : 0, alpha : 1}, 800).wait(2000)
			.call(function(){
				self.loadString(style);
			},this)
			.to({y : -tf.textHeight, alhpa : 0}, 300)
			.call(function(tf:BaseTextField){
				egret.Tween.removeTweens(tf);
				self._tfPool.push(tf);
				if(tf.parent){
					tf.parent.removeChild(tf);
				}
			},this,[tf])
		}
	}
	
	public dispose():void
	{


		super.dispose();
	}
}
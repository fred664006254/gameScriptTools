/**
 * 显示工具类
 * author dmj
 * date 2017/9/11
 * @class BaseButton
 */
namespace App
{
	export class DisplayUtil
	{
		private static grayFilter: egret.ColorMatrixFilter = null;
		private static alphaFilter: egret.ColorMatrixFilter = null;
		private static blackFilter: egret.ColorMatrixFilter = null;
		public constructor() 
		{
		}

		/**
		 * 设置显示对象是否使用对象池，默认不再使用
		 */
		public static useObjectPool:boolean=true;

		public static changeToGray(target: egret.DisplayObject)
		{
			if(this.grayFilter==null)
			{
				var matrix: number[] = [
					0.3086, 0.6094, 0.0820, 0, 0,
					0.3086, 0.6094, 0.0820, 0, 0,
					0.3086, 0.6094, 0.0820, 0, 0,
					0, 0, 0, 1, 0
				];
				this.grayFilter = new egret.ColorMatrixFilter(matrix);
			}
			target.filters = [this.grayFilter];
		}

		public static changeToBlack(target: egret.DisplayObject)
		{
			if(this.blackFilter==null)
			{
				var colorMatrix = [
					1,0,0,0,-255,
					0,1,0,0,-255,
					0,0,1,0,-255,
					0,0,0,1,0
				];
				this.blackFilter = new egret.ColorMatrixFilter(colorMatrix);
			}
			target.filters = [this.blackFilter];
		}

		public static changeToAlpha(target: egret.DisplayObject)
		{
			if(this.alphaFilter==null)
			{
				var colorMatrix = [
					0.3,0,0,0,12,
					0,0.3,0,0,12,
					0,0,0.3,0,12,
					0,0,0,1,0
				];
				this.alphaFilter = new egret.ColorMatrixFilter(colorMatrix);
			}
			target.filters = [this.alphaFilter];
		}

		public static changeToNormal(target: egret.DisplayObject)
		{
			target.filters = null;
		}

		public static addFactorFunc(target:any):void
		{
			// let targetClass:any = egret.getDefinitionByName(egret.getQualifiedClassName(target))
			Object.defineProperty(target.prototype, "factor", {
				get: function () {
					return 0;  
				},
				set: function (value) {
					this.x = (1 - value) * (1 - value) * this.tweenMoveList[0].x + 2 * value * (1 - value) * this.tweenMoveList[1].x + value * value * this.tweenMoveList[2].x;
					this.y = (1 - value) * (1 - value) * this.tweenMoveList[0].y + 2 * value * (1 - value) * this.tweenMoveList[1].y + value * value * this.tweenMoveList[2].y;
				},
				enumerable: true,
				configurable: true
			});
		}

		/**
		 * 遍历释放显示对象，传入容器
		 * @param target 需要释放的对象 
		 */
		public static destory(target:egret.DisplayObjectContainer):void
		{
			if(target.cacheAsBitmap)
			{
				target.cacheAsBitmap=false;
			}
			egret.Tween.removeTweens(target);
			target.mask=null;
			target.alpha=1;
			target.blendMode=egret.BlendMode.NORMAL;
			target.filters=null;
			if(target instanceof ScrollView)
			{
				target.dispose();
			}
			else
			{
				while(target.numChildren>0)
				{
					let firstChild:egret.DisplayObject=target.removeChildAt(0);
					if(firstChild.cacheAsBitmap)
					{
						firstChild.cacheAsBitmap=false;
					}
					egret.Tween.removeTweens(firstChild);
					if(firstChild["texture"])
					{
						firstChild["texture"]=null;
					}
					if(firstChild["bitmapData"])
					{
						firstChild["bitmapData"]=null;
					}
					if(firstChild instanceof CustomMovieClip)
					{
					}
					else if(firstChild instanceof BaseLoadBitmap)
					{
						BaseLoadBitmap.release(firstChild);
					}
					else if(firstChild instanceof BaseBitmap)
					{
						BaseBitmap.release(firstChild);
					}
					else if(firstChild instanceof particle.GravityParticleSystem)
					{
						firstChild.stop(true);
					}
					if(firstChild["dispose"])
					{
						firstChild["dispose"]();
					}
					else
					{
						if(firstChild instanceof egret.DisplayObjectContainer)
						{
							DisplayUtil.destory(<egret.DisplayObjectContainer>firstChild);
						}
					}
				}
			}
		}

		/**
		 * 删除目标对象所有子节点
		 */
		public static removeChildren(target:egret.DisplayObjectContainer):void
		{
			if(target&&target.numChildren)
			{
				while(target.numChildren>0)
				{
					let child:egret.DisplayObject = target.removeChildAt(0);
					if(child)
					{
						if(child instanceof egret.DisplayObjectContainer)
						{
							if(child["dispose"])
							{
								child["dispose"]();
							}
							else
							{
								DisplayUtil.destory(child);
							}
						}
						else
						{
							if(child["dispose"])
							{
								child["dispose"]();
							}
						}
					}
				}
			}
		}

		/**
		 * 相对布局
		 * @param style   对齐方式 |分割 left right horizontal ｜ top bottom vertical
		 * @param self    本身对象
		 * @param base      相对参考对象
		 * @param distance 位置距离
		 * @param local 是否是相对布局
		 * @param cal 仅计算坐标
		 */
		public static setLayoutPosition(style:string,self:egret.DisplayObject|egret.DisplayObjectContainer,base:egret.DisplayObject|egret.DisplayObjectContainer,distance:Array<number>=[0,0],local:boolean = false, cal:boolean = false) : egret.Point{
			let view = this;
			let _x = self.x;
			let _y = self.y;
			let style_arr = style.split('|');
			for(let layout of style_arr){
				switch(layout){
					case LayoutConst.left:
						_x = base.x - base.anchorOffsetX + distance[0] + self.anchorOffsetX;
						break;	
					case LayoutConst.right:
						_x = base.x - base.anchorOffsetX + base.width * Math.abs(base.scaleX) - distance[0] - self.width * Math.abs(self.scaleX) + self.anchorOffsetX;
						break;	
					case LayoutConst.top:
						_y = base.y - base.anchorOffsetY + distance[1] + self.anchorOffsetY;
						break;	
					case LayoutConst.bottom:
						_y = base.y - base.anchorOffsetY + base.height * Math.abs(base.scaleY) - distance[1] - self.height * Math.abs(self.scaleY) + self.anchorOffsetY;
						break;
					case LayoutConst.horizontalCenter:
						_x = base.x - base.anchorOffsetX + (base.width * Math.abs(base.scaleX) - self.width * Math.abs(self.scaleX)) / 2 + self.anchorOffsetX + distance[0];
						break;	
					case LayoutConst.verticalCenter:
						_y = base.y - base.anchorOffsetY + (base.height * Math.abs(base.scaleY) - self.height * Math.abs(self.scaleY)) / 2 + self.anchorOffsetY + distance[1];
						break;	
				}
			}

			if(local){
				if(_x){
					_x -= (base.x);
				}
				if(_y){
					_y -= (base.y);
				}
			}
			if(!cal){
				if(_x){
					self.x = _x;
				}
				if(_y){
					self.y = _y;
				}
			}
			return new egret.Point(_x,_y);
		}

		public static formatWordWrap(text:BaseTextField,txtStr:string):void
		{
			let str2=txtStr;
			let idx=0;
			text.text=txtStr;
			if(text.numLines<2)
			{
				return;
			}
			text.text='.';
			let reg=new RegExp("[\u0000-\u002f\u003a-\u003b\u003d\u003f-\u007F\u2000-\u206F\u3000-\u303F\uff0c]");
			let strCount:number=0;
        	let lastLineCount:number=0;
			while(idx<str2.length)
			{
				let startIdx=idx;
				idx=DisplayUtil.formatTxtTag(str2,idx);
				idx++;
				strCount++;
				let line= text.numLines;
				text.text = str2.substr(0,idx);
				let line2=text.numLines;
				if(line2>line)
				{
					if(idx>2&&(strCount-lastLineCount>1))
					{
						let tmpS1=str2.substr(0,idx-2);
						let tmpS2=str2.substr(idx-2);
						let tmpStr=str2[idx-2].replace(/\s/g,"");
						let preStr=str2[idx-3].replace(/\s/g,"");
						let endStr=str2[idx-1].replace(/\s/g,"");
						let realcheckStr=str2.substr(0,idx-2);
						if(tmpStr)
						{
							if(preStr&&reg.test(preStr)==false&&endStr&&reg.test(endStr)==false)
							{
								let tdx=realcheckStr.length-1;
								a:while(reg.test(realcheckStr[tdx])==false)
								{
									if(realcheckStr[tdx]==">")
									{
										let tmprealcheckStr=realcheckStr.substr(0,tdx);
										tdx=tmprealcheckStr.lastIndexOf("<");
									}
									if(tdx<1)
									{
										break a;
									}
									tdx--;
								}
								let words=false;
								if(tdx<realcheckStr.length-1&&tdx>0)
								{
									text.text = realcheckStr.substr(0,tdx);
									if(text.numLines==line)
									{
										str2=str2.substr(0,tdx)+"\n"+str2.substr(tdx);
										words=true;
									}
								}
								// if(!words)
								// {
								// 	str2=tmpS1+"-\n"+tmpS2;
								// }
							}
							else if((!preStr||reg.test(preStr))&&(endStr&&reg.test(endStr)==false))
							{
								str2=tmpS1+"\n"+tmpS2;
							}
							else if((preStr&&reg.test(preStr)==false)&&(endStr&&reg.test(endStr)))
							{
								str2=tmpS1+"\n"+tmpS2;
							}
						}
					}
					lastLineCount=strCount;
				}
				
			}
			text.text=str2;
		}

		private static formatTxtTag(str2:string,idx:number):number
		{
			let tmpStr=str2.substr(idx);
			if(tmpStr.indexOf("<")==0)
			{
				idx += (tmpStr.indexOf(">")+1);
				idx=this.formatTxtTag(str2,idx);
			}
			return idx;
		}
	}
}
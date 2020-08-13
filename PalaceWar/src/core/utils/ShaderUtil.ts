/**
 * Shader常用方法工具类
 * author hyd
 * date 2019/8/9
 * @class ShaderUtil
 */
namespace App
{
	export class ShaderUtil 
	{
		public constructor() 
		{
        }
        
        /**
         * @static
         * @param {egret.DisplayObject} 设置渐变的DisplayObject
         * @param {number} beginColor 顶端颜色
         * @param {number} endColor 底端颜色
         * @param {number} [angle] 角度值 0 ~ 360
         * @param {number} [offset] 偏移值 -1 ~ 1
         * @param {number} [uvRatio] UV比例，默认为0。如果是textfield则会自动设置为1，如果是bitmap则自动设置为10。如果非0则使用该值
         * @memberof ShaderUtil
         */
        public static setGradientColor(displayObject:egret.DisplayObject,beginColor:number,endColor:number,angle?:number,offset?:number,uvRatio?:number):void
        {

            if(App.DeviceUtil.CheckWebglRenderMode()){

                let beginColorRgb = App.MathUtil.hexToRgb(beginColor);
                let endColorRgb = App.MathUtil.hexToRgb(endColor);
                let lineCount:number;
                let lineSpaceRate:number;
                let topRate:number;
                let bottomRate:number;

                let _offset = 0;
                if(offset != 0) _offset = offset;
                let _angle = 0;
                if(angle != 0) _angle = angle;
                let _uvRatio = 0;
                if(uvRatio != 0) _uvRatio = uvRatio;

                let uniform = {};
                if(displayObject instanceof BaseTextField){
                    if(!_uvRatio)  _uvRatio = 1;
                    let text = <BaseTextField>displayObject;
                    let realTextHeight = text.textHeight - 6;
                    lineCount = text.numLines;
                    lineSpaceRate = (text.lineSpacing)/text.height;
                    //text.lineSpacing>2 ? (text.lineSpacing+2)/text.height :2;
                    if(text.verticalAlign === egret.VerticalAlign.MIDDLE){
                        topRate = (text.height - realTextHeight)/2/text.height;
                        bottomRate = topRate;
                    }else if(text.verticalAlign === egret.VerticalAlign.BOTTOM){
                        topRate = (text.height - realTextHeight +2)/text.height;
                        bottomRate = 4/text.height;
                    }else{
                        topRate = 4/text.height;
                        bottomRate = (text.height - text.textHeight +2)/text.height;
                    }
                    console.log(topRate , bottomRate ,text.textHeight/text.height, lineSpaceRate*(lineCount-1))

                    uniform = {
                        beginColor:beginColorRgb,
                        endColor:endColorRgb,
                        uvRatio:_uvRatio,
                        angle:_angle,
                        offset:_offset,
                        lineCount:lineCount,
                        lineSpaceRate:lineSpaceRate,
                        topRate:topRate,
                        bottomRate:bottomRate
                    }
                }else if(displayObject instanceof BaseBitmap || displayObject instanceof BaseLoadBitmap ){
                    if(!_uvRatio) _uvRatio = 10;
                    uniform = {
                        beginColor:beginColorRgb,
                        endColor:endColorRgb,
                        uvRatio:_uvRatio,
                        angle:_angle,
                        offset:_offset,
                        lineCount:0,
                        lineSpaceRate:0,
                        topRate:0,
                        bottomRate:0
                    }
                }

                let customFilter = new egret.CustomFilter(
                    ShaderConst.TEXT_GRADIENT_VERT,
                    ShaderConst.TEXT_GRADIENT_FRAG,
                    uniform
                );
                
                displayObject.filters = [customFilter];
            }

    
        }


        public static removeGradientColor(displayObject:egret.DisplayObject):void
        {

            if(App.DeviceUtil.CheckWebglRenderMode()){
                displayObject.filters = null;
            }

    
        }

        public static setAcKiteLineShader(displayObject: egret.DisplayObject, offset: number,boffset:number): void {

            if (App.DeviceUtil.CheckWebglRenderMode()) {
                let uniform = {
                    offset: offset,
                    boffset:boffset
                }
                let customFilter = new egret.CustomFilter(
                    ShaderConst.TEXT_GRADIENT_VERT,
                    ShaderConst.ACKITE_LINE_FRAG,
                    uniform
                );
                displayObject.filters = [customFilter];
            }


        }

        public static removeShader(displayObject: egret.DisplayObject): void {
            if (App.DeviceUtil.CheckWebglRenderMode()) {
                displayObject.filters = null;
            }
        }

	}
}
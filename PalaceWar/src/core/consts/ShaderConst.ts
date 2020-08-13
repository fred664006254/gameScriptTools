/**
 * shader的顶点着色器和片段着色器代码段
 * author hyd
 * date 2019/8/21
 * @class ShaderConst
 */
namespace ShaderConst {
    /**
     * 文字渐变顶点着色器
     */
    export const TEXT_GRADIENT_VERT: string =
        `
        attribute vec2 aVertexPosition;
        attribute vec2 aTextureCoord;
        attribute vec2 aColor;
        uniform vec2 projectionVector;
        varying vec2 vTextureCoord;
        varying vec4 vColor;
        const vec2 center = vec2(-1.0, 1.0);
        void main(void) {
           gl_Position = vec4( (aVertexPosition / projectionVector) + center , 0.0, 1.0);
           vTextureCoord = aTextureCoord;
           vColor = vec4(aColor.x, aColor.x, aColor.x, aColor.x);
        }
    `;

    /**
     * 文字渐变片段着色器
     */
    export const TEXT_GRADIENT_FRAG: string =
        `
        precision lowp float;
        varying vec2 vTextureCoord;
        varying vec4 vColor;
        uniform sampler2D uSampler;
        //uniform vec4 color;
        uniform vec3 beginColor;
        uniform vec3 endColor;
        uniform float uvRatio;
        uniform float angle;
        uniform float offset;
        uniform float lineCount;
        uniform float lineSpaceRate;
        uniform float topRate;
        uniform float bottomRate;
        
        void main () {
            vec4 texColor = texture2D(uSampler, vTextureCoord);
            float angleInRadians = radians(angle); 
            float ratio = 0.0;

            if(lineCount > 0.5){
                float lineHeight = (1.0 - topRate - bottomRate - lineSpaceRate * (lineCount - 1.0)) / lineCount;
                if( vTextureCoord.y > topRate){
                    float inLinePos = mod((vTextureCoord.y - topRate),(lineHeight + lineSpaceRate ));
                    if(inLinePos <= lineHeight){
                        float drawPosY =  clamp(inLinePos / lineHeight , 0.0, 1.0);
                        ratio = clamp( (drawPosY * cos(angleInRadians) + vTextureCoord.x * sin(angleInRadians) + offset) * uvRatio , 0.0, 1.0);
    
                    }
                }
            }else{
                ratio = clamp( (vTextureCoord.y * cos(angleInRadians) + vTextureCoord.x * sin(angleInRadians) + offset) * uvRatio , 0.0, 1.0);
            }
            float beginRatio = 1.0 - ratio;
            float endRatio = ratio;  
            gl_FragColor = vec4(
               texColor.r * (beginColor.x * beginRatio + endColor.x * endRatio),
               texColor.g * (beginColor.y * beginRatio + endColor.y * endRatio),
               texColor.b * (beginColor.z * beginRatio + endColor.z * endRatio),
               texColor.a * (1.0 * beginRatio + 1.0 * endRatio)
            );
        }
    `;

    export const ACKITE_LINE_FRAG: string =
        `
        precision lowp float;
        varying vec2 vTextureCoord;
        varying vec4 vColor;
        uniform sampler2D uSampler;
        //uniform vec4 color;
        uniform float offset;
        uniform float boffset;
        
        void main () {
            vec4 texColor = texture2D(uSampler, vTextureCoord);
            float angleInRadians = radians(0.0); 
            float ratio = 0.0;
            ratio = clamp( (vTextureCoord.y * cos(angleInRadians) + vTextureCoord.x * sin(angleInRadians)), 0.0, 1.0);
            float beginRatio = 1.0 - ratio;
            float endRatio = ratio;
            float alpha = 1.0;
            if(ratio>offset){
                if(ratio > (offset+boffset)){
                    alpha = 0.15;
                }else{
                    alpha = 0.85 * (offset+boffset-ratio)/boffset + 0.15;
                }
            }
            gl_FragColor = vec4(
            texColor.r,
            texColor.g,
            texColor.b,
            texColor.a * alpha
            );
        }
    `;
}
/**
 * shader的顶点着色器和片段着色器代码段
 * author hyd
 * date 2019/8/21
 * @class ShaderConst
 */
var ShaderConst;
(function (ShaderConst) {
    /**
     * 文字渐变顶点着色器
     */
    ShaderConst.TEXT_GRADIENT_VERT = "\n        attribute vec2 aVertexPosition;\n        attribute vec2 aTextureCoord;\n        attribute vec2 aColor;\n        uniform vec2 projectionVector;\n        varying vec2 vTextureCoord;\n        varying vec4 vColor;\n        const vec2 center = vec2(-1.0, 1.0);\n        void main(void) {\n           gl_Position = vec4( (aVertexPosition / projectionVector) + center , 0.0, 1.0);\n           vTextureCoord = aTextureCoord;\n           vColor = vec4(aColor.x, aColor.x, aColor.x, aColor.x);\n        }\n    ";
    /**
     * 文字渐变片段着色器
     */
    ShaderConst.TEXT_GRADIENT_FRAG = "\n        precision lowp float;\n        varying vec2 vTextureCoord;\n        varying vec4 vColor;\n        uniform sampler2D uSampler;\n        //uniform vec4 color;\n        uniform vec3 beginColor;\n        uniform vec3 endColor;\n        uniform float uvRatio;\n        uniform float angle;\n        uniform float offset;\n        uniform float lineCount;\n        uniform float lineSpaceRate;\n        uniform float topRate;\n        uniform float bottomRate;\n        \n        void main () {\n            vec4 texColor = texture2D(uSampler, vTextureCoord);\n            float angleInRadians = radians(angle); \n            float ratio = 0.0;\n\n            if(lineCount > 0.5){\n                float lineHeight = (1.0 - topRate - bottomRate - lineSpaceRate * (lineCount - 1.0)) / lineCount;\n                if( vTextureCoord.y > topRate){\n                    float inLinePos = mod((vTextureCoord.y - topRate),(lineHeight + lineSpaceRate ));\n                    if(inLinePos <= lineHeight){\n                        float drawPosY =  clamp(inLinePos / lineHeight , 0.0, 1.0);\n                        ratio = clamp( (drawPosY * cos(angleInRadians) + vTextureCoord.x * sin(angleInRadians) + offset) * uvRatio , 0.0, 1.0);\n    \n                    }\n                }\n            }else{\n                ratio = clamp( (vTextureCoord.y * cos(angleInRadians) + vTextureCoord.x * sin(angleInRadians) + offset) * uvRatio , 0.0, 1.0);\n            }\n            float beginRatio = 1.0 - ratio;\n            float endRatio = ratio;  \n            gl_FragColor = vec4(\n               texColor.r * (beginColor.x * beginRatio + endColor.x * endRatio),\n               texColor.g * (beginColor.y * beginRatio + endColor.y * endRatio),\n               texColor.b * (beginColor.z * beginRatio + endColor.z * endRatio),\n               texColor.a * (1.0 * beginRatio + 1.0 * endRatio)\n            );\n        }\n    ";
})(ShaderConst || (ShaderConst = {}));
//# sourceMappingURL=ShaderConst.js.map
/**
 * 文本自定义配置
 * author dmj
 * date 2017/9/11
 * @class TextFieldConst
 */
namespace TextFieldConst 
{

	///////字体大小配置start//////
	/**标题副标题字号大小 */
	/**
	 * 大标题
	 * 32
	 */
	export const FONTSIZE_TITLE_BIG:number = 32;
	/**
	 * 弹板标题
	 * 26
	 */
	export const FONTSIZE_TITLE_COMMON:number = 26;
	/**
	 * 小标题
	 * 24
	 */
	export const FONTSIZE_TITLE_SMALL:number = 24;

	/**除标题、按钮外，都用context字号大小 */
	/**
	 * 名称，字段等用common
	 * 22
	 */
	export const FONTSIZE_CONTENT_COMMON:number = 22;
	/**
	 * 道具描述等用small 
	 * 20
	 */
	export const FONTSIZE_CONTENT_SMALL:number = 20;

	/**
	 * 按钮字号大小 24
	 * 按钮暂时就common
	 */
	export const FONTSIZE_BUTTON_COMMON:number = 24;
	/**
	 * 活动字号大小 18
	 */
	export const FONTSIZE_ACTIVITY_COMMON:number = 18;
	///////字体大小配置end///////

	///////字体颜色配置start//////
	/**
	 * 深黑
	 */
	export let COLOR_BLACK:number = 0x272727;

	/**
	 * 浅黑
	 */
	export let COLOR_LIGHT_BLACK:number = 0x4a4a4a;

	/**
	 * 淡黄
	 */
	export let COLOR_LIGHT_YELLOW:number = 0xfcf3b4;
	/**
	 * 白色
	 */
	export let COLOR_WHITE:number = 0xfff7e8;
	/**
	 * 褐色
	 */
	export let COLOR_BROWN:number=0x3e1f0f;

	/**
	 * 咖啡色 浅一些
	 */
	export let COLOR_BROWN2:number=0x8f4f0a;

	/**
	 * 褐色 浅一些
	 */
	export let COLOR_BROWN3:number=0x7b6349;

	/**
	 * 土红
	 */
	export let COLOR_LIGHT_RED:number=0xd1946e;
	/**
	 * 提示黄
	 */
	export let COLOR_WARN_YELLOW:number = 0xfedb38;
	/**
	 * 提示黄2，颜色更深，适合放到亮色底板
	 */
	export let COLOR_WARN_YELLOW2:number = 0xa87e00;
	/**
	 * 提示红
	 */
	export let COLOR_WARN_RED:number = 0xce1515;
	/**
	 * 提示红2，颜色更深，适合放到亮色底板
	 */
	export let COLOR_WARN_RED2:number = 0xbb2800;
	/**
	 * 提示红3
	 */
	export let COLOR_WARN_RED3:number = 0xff3c3c;
	/**
	 * 提示红4 颜色稍浅，适合放到深色底板
	 */
	export let COLOR_WARN_RED4:number = 0xff8888;
	/**
	 * 提示绿
	 */
	export let COLOR_WARN_GREEN:number = 0x21eb39;
	/**
	 * 提示绿，颜色更深，适合放到亮色底板
	 */
	export let COLOR_WARN_GREEN2:number = 0x3e9b00;
	/**
	 * 草绿色
	 */
	export let COLOR_WARN_GREEN3:number = 0x3aeb67;

	/**
	 * 新ui绿色
	 */
	export let COLOR_WARN_GREEN4:number = 0x167b2e;

	/**
	 * 品质灰
	 */
	export let COLOR_QUALITY_GRAY:number =0xdfdfdf

	/**
	 * 品质灰
	 */
	export let COLOR_GRAY_LIGHT:number =0xaaaaaa
	/**
	 * 品质白
	 */
	export let COLOR_QUALITY_WHITE:number = 0xdfdfdf;
	/**
	 * 品质绿
	 */
	export let COLOR_QUALITY_GREEN:number = 0x65eb5d;
	/**
	 * 品质蓝
	 */
	export let COLOR_QUALITY_BLUE:number = 0x649efa;
	/**
	 * 品质紫
	 */
	export let COLOR_QUALITY_PURPLE:number = 0xca6cfa;
	/**
	 * 品质橙
	 */
	export let COLOR_QUALITY_ORANGE:number = 0xffaf5a;
	/**
	 * 红橙 quality6使用
	 */
	export let COLOR_RED_ORANGE:number = 0xe4865b;
	/**
	 * 品质红
	 */
	export let COLOR_QUALITY_RED:number = 0xce1515
	/**
	 * 品质黄
	 */
	export let COLOR_QUALITY_YELLOW:number = 0xfedb38;
	/**
	 * 品质黄 quality8使用
	 */
	export let COLOR_QUALITY_YELLOW2:number = 0xebce46;

	/**
	 * tab bar 默认
	 */
	export let COLOR_TABBAR:number = 0xe1ba86;
	export let COLOR_TABBAR_SELECT:number = 0x472c26;
	///////字体颜色配置end///////

	// 对齐方式
	export const ALIGH_LEFT:string = egret.HorizontalAlign.LEFT;
	export const ALIGH_RIGHT:string = egret.HorizontalAlign.RIGHT;
	/**左右居中 */
	export const ALIGH_CENTER:string = egret.HorizontalAlign.CENTER;
	export const ALIGH_BOTTOM:string = egret.VerticalAlign.BOTTOM;
	export const ALIGH_TOP:string = egret.VerticalAlign.TOP;
	/**上下居中 */
	export const ALIGH_MIDDLE:string = egret.VerticalAlign.MIDDLE;

	//font name
	export const FONTNAME_BOSS_SCORE:string = "socre_fnt";
	export const FONTNAME_ITEMTIP:string = "tip_fnt";

	/**
	 * 蓝紫色
	 */
	export let COLOR_BLUE:number = 0x2013fa;
}
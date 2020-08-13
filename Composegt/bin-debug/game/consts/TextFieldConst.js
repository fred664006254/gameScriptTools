/**
 * 文本自定义配置
 * author dmj
 * date 2017/9/11
 * @class TextFieldConst
 */
var TextFieldConst;
(function (TextFieldConst) {
    ///////字体大小配置start//////
    /**标题副标题字号大小 */
    /**
     * 大标题
     * 32
     */
    TextFieldConst.FONTSIZE_TITLE_BIG = 32;
    /**
     * 弹板标题
     * 26
     */
    TextFieldConst.FONTSIZE_TITLE_COMMON = 26;
    /**
     * 小标题
     * 24
     */
    TextFieldConst.FONTSIZE_TITLE_SMALL = 24;
    /**除标题、按钮外，都用context字号大小 */
    /**
     * 名称，字段等用common
     * 22
     */
    TextFieldConst.FONTSIZE_CONTENT_COMMON = 22;
    /**
     * 道具描述等用small
     * 20
     */
    TextFieldConst.FONTSIZE_CONTENT_SMALL = 20;
    /**
     * 活动字号大小 18
     */
    TextFieldConst.FONTSIZE_ACTIVITY_COMMON = 18;
    /**
     * 按钮字号大小 24
     * 按钮暂时就common
     */
    TextFieldConst.FONTSIZE_BUTTON_COMMON = 24;
    ///////字体大小配置end///////
    ///////字体颜色配置start//////
    /**
     * 深黑
     */
    TextFieldConst.COLOR_BLACK = 0x272727;
    /**
     * 淡黄
     */
    TextFieldConst.COLOR_LIGHT_YELLOW = 0xfcf3b4;
    /**
     * 白色
     */
    TextFieldConst.COLOR_WHITE = 0xfff8e8;
    /**
     * 褐色
     */
    TextFieldConst.COLOR_BROWN = 0x7a4a1a;
    // export let COLOR_BROWN:number=0x420e00;
    /**
     * 土红
     */
    TextFieldConst.COLOR_LIGHT_RED = 0xd1946e;
    /**
     * 提示黄
     */
    TextFieldConst.COLOR_WARN_YELLOW = 0xfdf3b5;
    /**
     * 提示黄2，颜色更深，适合放到亮色底板
     */
    TextFieldConst.COLOR_WARN_YELLOW2 = 0xfedb38;
    /**
     * 提示红
     */
    TextFieldConst.COLOR_WARN_RED = 0xac0101;
    /**
     * 提示红2，颜色更深，适合放到亮色底板
     */
    TextFieldConst.COLOR_WARN_RED2 = 0xbb2800;
    /**
     * 提示红3
     */
    TextFieldConst.COLOR_WARN_RED3 = 0xff3c3c;
    /**
     * 提示绿
     */
    TextFieldConst.COLOR_WARN_GREEN = 0x13851e;
    /**
     * 提示绿，颜色更亮，适合放到深色底板
     */
    TextFieldConst.COLOR_WARN_GREEN2 = 0x21eb39;
    /**
     * 品质灰
     */
    TextFieldConst.COLOR_QUALITY_GRAY = 0x7e7e7e;
    /**
     * 品质白
     */
    TextFieldConst.COLOR_QUALITY_WHITE = 0xdfdfdf;
    /**
     * 品质绿
     */
    // export let COLOR_QUALITY_GREEN:number = 0x619c6c;
    TextFieldConst.COLOR_QUALITY_GREEN = 0x359270;
    /**
     * 品质蓝
     */
    TextFieldConst.COLOR_QUALITY_BLUE = 0x617b9c;
    /**
     * 品质紫
     */
    TextFieldConst.COLOR_QUALITY_PURPLE = 0x87659f;
    /**
     * 品质橙
     */
    TextFieldConst.COLOR_QUALITY_ORANGE = 0xdc9740;
    /**
     * 品质红
     */
    TextFieldConst.COLOR_QUALITY_RED = 0xce1515;
    /**
     * 品质黄
     */
    TextFieldConst.COLOR_QUALITY_YELLOW = 0xfedb38;
    /**
     * 按钮黄色
     */
    // export let COLOR_BTN_YELLOW:number = 0x764705;
    TextFieldConst.COLOR_BTN_YELLOW = 0x6f2f00;
    /**
     * 按钮橘色
     */
    TextFieldConst.COLOR_BTN_ORANGE = 0x6f2f00;
    /**
     * 按钮蓝色
     */
    TextFieldConst.COLOR_BTN_BLUE = 0x0d3b5f;
    /**
     * tabBar按钮颜色
     */
    TextFieldConst.COLOR_TABBAR = 0x604f2c;
    /**
     *
     * wintab 颜色
     * 不选择
     */
    TextFieldConst.COLOR_WINTABBAR = 0x420e00;
    /**
     *
     * wintab 颜色
     * 选择
     */
    TextFieldConst.COLOR_WINTABBARSEL = 0x420e00;
    /**
     * 跨服黄色
     */
    TextFieldConst.COLOR_CROSS_YELLOW = 0xf1e195;
    /**
     * 跨服红色
     */
    TextFieldConst.COLOR_CROSS_RED = 0xdd410a;
    /**
     * 跨服白色
     */
    TextFieldConst.COLOR_CROSS_WHITE = 0xd8cbbc;
    /**
     * 输入框
     */
    TextFieldConst.COLOR_INPUT = 0xc3a38a;
    /**
     * 品质灰
     */
    TextFieldConst.COLOR_QUALITY_GRAY_NEW = 0x7e7e7e;
    /**
     *
     * 门客品质白
     */
    TextFieldConst.COLOR_QUALITY_WHITE_SERVANT = 0xacacac;
    /**
     * 品质白
     */
    TextFieldConst.COLOR_QUALITY_WHITE_NEW = 0x7d7d7d;
    /**
     * 品质绿
     */
    // export let COLOR_QUALITY_GREEN:number = 0x619c6c;
    TextFieldConst.COLOR_QUALITY_GREEN_NEW = 0x11a972;
    /**
     * 品质蓝
     */
    TextFieldConst.COLOR_QUALITY_BLUE_NEW = 0x5e84b3;
    /**
     * 品质紫
     */
    TextFieldConst.COLOR_QUALITY_PURPLE_NEW = 0xb05cbe;
    /**
     * 品质橙
     */
    TextFieldConst.COLOR_QUALITY_ORANGE_NEW = 0xb77b45;
    /**
     * 品质红
     */
    TextFieldConst.COLOR_QUALITY_RED_NEW = 0xcd4040;
    /**
     * 品质黄
     */
    TextFieldConst.COLOR_QUALITY_YELLOW_NEW = 0xb1940f;
    /**
     * 品质金
     */
    TextFieldConst.COLOR_QUALITY_GOLD_NEW = 0xcb9a25;
    /**
     * 提示绿 提升
     */
    TextFieldConst.COLOR_WARN_GREEN_NEW = 0x359270;
    /**
     * 提示红 提升
     */
    TextFieldConst.COLOR_WARN_RED_NEW = 0xac0101;
    /**
     * 提示黄 提升
     */
    TextFieldConst.COLOR_WARN_YELLOW_NEW = 0xfdf3b5;
    /**
     * 界面标题字颜色
     */
    TextFieldConst.COLOR_TITLE_NAME = 0xead39c;
    /**
     * 新 棕色
     */
    TextFieldConst.COLOR_BROWN_NEW = 0x420e00;
    ///////字体颜色配置end///////
    // 对齐方式
    TextFieldConst.ALIGH_LEFT = egret.HorizontalAlign.LEFT;
    TextFieldConst.ALIGH_RIGHT = egret.HorizontalAlign.RIGHT;
    /**左右居中 */
    TextFieldConst.ALIGH_CENTER = egret.HorizontalAlign.CENTER;
    TextFieldConst.ALIGH_BOTTOM = egret.VerticalAlign.BOTTOM;
    TextFieldConst.ALIGH_TOP = egret.VerticalAlign.TOP;
    /**上下居中 */
    TextFieldConst.ALIGH_MIDDLE = egret.VerticalAlign.MIDDLE;
    //font name
    TextFieldConst.FONTNAME_BOSS_SCORE = "socre_fnt";
    TextFieldConst.FONTNAME_ITEMTIP = "tip_fnt";
})(TextFieldConst || (TextFieldConst = {}));

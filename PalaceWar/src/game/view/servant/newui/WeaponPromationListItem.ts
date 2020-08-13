/**
 * 加工详情列表item
 * author shaoliang
 * date 2019/8/6
 * @class WeaponPromationListItem
 */
class WeaponPromationListItem extends ScrollListItem
{
    public constructor() 
    {
		super();
    }

    protected initItem(index:number,data:any,itemparam)
    {
         let view = this;
         this.width = 524;
         this.height = 42;

        let mask = BaseBitmap.create(`weapon_attr_color_bg`);
		mask.width = this.width-4;
        mask.height = 40;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, mask, this,[2,0]);
        this.addChild(mask);

        let posy = 21;
        let value1 = ComponentManager.getTextField(String(data[0]),22,TextFieldConst.COLOR_BROWN);
        value1.width = 108;
        value1.setPosition(3,posy-value1.height/2);
        value1.textAlign = egret.HorizontalAlign.CENTER;
        this.addChild(value1);

        let value2 = ComponentManager.getTextField(String(data[1]),22,TextFieldConst.COLOR_BROWN);
        value2.width = 76;
        value2.setPosition(116,posy-value2.height/2);
        value2.textAlign = egret.HorizontalAlign.CENTER;
        this.addChild(value2);

        let value3 = ComponentManager.getTextField(String(data[2]),22,TextFieldConst.COLOR_BROWN);
        value3.width = 76;
        value3.setPosition(116+76,posy-value3.height/2);
        value3.textAlign = egret.HorizontalAlign.CENTER;
        this.addChild(value3);

        let value4 = ComponentManager.getTextField(String(data[3]),22,TextFieldConst.COLOR_BROWN);
        value4.width = 76;
        value4.setPosition(116+76*2,posy-value4.height/2);
        value4.textAlign = egret.HorizontalAlign.CENTER;
        this.addChild(value4);

        let value5 = ComponentManager.getTextField(String(data[4]),22,TextFieldConst.COLOR_BROWN);
        value5.width = 76;
        value5.setPosition(116+76*3,posy-value5.height/2);
        value5.textAlign = egret.HorizontalAlign.CENTER;
        this.addChild(value5);

        let value6 = ComponentManager.getTextField(String(data[5]),22,TextFieldConst.COLOR_BROWN);
        value6.width = 96;
        value6.setPosition(116+76*4,posy-value6.height/2);
        value6.textAlign = egret.HorizontalAlign.CENTER;
        this.addChild(value6);


        let lineImg = BaseBitmap.create("public_line1");
		lineImg.width = view.width;
        this.setLayoutPosition(LayoutConst.horizontalCenterbottom, lineImg, view);
        this.addChild(lineImg);


    }

}
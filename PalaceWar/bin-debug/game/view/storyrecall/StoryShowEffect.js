var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var StoryShowEffect = (function (_super) {
    __extends(StoryShowEffect, _super);
    function StoryShowEffect() {
        return _super.call(this) || this;
    }
    StoryShowEffect.prototype.init = function (f, f2, o) {
        var alpha = BaseBitmap.create("public_alphabg");
        alpha.width = GameConfig.stageWidth;
        alpha.height = GameConfig.stageHeigth;
        this.addChild(alpha);
        this.touchEnabled = true;
        var book = BaseBitmap.create("officialcareer_storyrecall");
        book.setScale(1.1);
        var book_x = 274 - book.width * 0.05;
        var book_y = GameConfig.stageHeigth - 301 - book.height * 0.05;
        book.setPosition(book_x, book_y);
        this.addChild(book);
        var book2 = BaseBitmap.create("officialcareer_storyrecall");
        book2.setScale(2.2);
        var book2_x = 274 - book2.width * 0.6;
        var book2_y = GameConfig.stageHeigth - 301 + book2.height * 0.6 - 30;
        book2.setPosition(book2_x, book2_y);
        this.addChild(book2);
        book2.alpha = 0.1;
        var light = BaseBitmap.create("officialcareer_orange_bg");
        light.width = GameConfig.stageWidth;
        light.height = GameConfig.stageHeigth;
        this.addChild(light);
        light.alpha = 0;
        var book_x1 = book_x - book.width * 0.55;
        var book_y1 = book_y - book.height * 0.55 - 100;
        var book_x2 = book_x - book.width * 1.65;
        var book_y2 = book_y - book.height * 1.65 - 150;
        var book_x3 = book_x - book.width * 2.4;
        var book_y3 = book_y - book.height * 2.4 - 150;
        egret.Tween.get(book).to({ scaleX: 2.2, scaleY: 2.2, x: book_x1, y: book_y1 }, 130).to({ scaleX: 4.4, scaleY: 4.4, x: book_x2, y: book_y2 }, 200).to({ scaleX: 5.9, scaleY: 5.9, x: book_x3, y: book_y3 }, 70).call(function () {
            book.dispose();
        });
        var book2_x1 = book2_x - book2.width * 1.1;
        var book2_y1 = book2_y - book2.height * 1.1 - 200;
        ;
        var book2_x2 = book2_x - book2.width * 1.85;
        var book2_y2 = book2_y - book2.height * 1.85 - 280;
        var book2_x3 = book2_x - book2.width * 4.8;
        var book2_y3 = book2_y - book2.height * 4.8 - 350;
        egret.Tween.get(book2).to({ scaleX: 4.4, scaleY: 4.4, x: book2_x1, y: book2_y1, alpha: 0.4 }, 130).to({ scaleX: 5.9, scaleY: 5.9, x: book2_x2, y: book2_y2, alpha: 0.4 }, 200)
            .to({ scaleX: 12, scaleY: 12, x: book2_x3, y: book2_y3, alpha: 0.4 }, 130);
        var that = this;
        egret.Tween.get(light).to({ alpha: 0 }, 270).to({ alpha: 1 }, 200).call(f, o).to({ alpha: 0 }, 200).call(f2, o).call(function () {
            that.dispose();
        });
    };
    return StoryShowEffect;
}(BaseDisplayObjectContainer));
__reflect(StoryShowEffect.prototype, "StoryShowEffect");
//# sourceMappingURL=StoryShowEffect.js.map
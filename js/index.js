(function () {
    'use strict';
    requestAnimationFrame(AnimationFrame);
    var canvasElement = document.getElementById("canvas"),
        //926 600
        renderer = PIXI.autoDetectRenderer(1204, 900, canvasElement, false, false),
        stage = new PIXI.Stage(0x0, true),
        imgDir = "imgs/";
    var transparentTexture = textureFromImage('transparent_1x1.gif'),
        mainPageTexture = textureFromImage("floorplan_mod.jpg"),
        kitchenTexture = textureFromImage("kitchen_mod.jpg"),
        livingRoomTexture = textureFromImage("livingroom_mod.jpg"),
        backgroundSprite = new PIXI.Sprite(transparentTexture);


    stage.addChild(backgroundSprite);
    PIXI.Sprite.prototype.buttonMode = true;

    function textureFromImage(imageName) {
        return PIXI.Texture.fromImage(imgDir + imageName);
    };

    function AnimationFrame() {
        requestAnimationFrame(AnimationFrame);
        renderer.render(stage);
    }

    function overSprite(textureImage, position) {
        var self = this;
        this.texture = textureFromImage(textureImage);
        this.sprite = new PIXI.Sprite(transparentTexture);
        this.isMouseOver = false;
        if (this.texture.baseTexture.hasLoaded) {
            this.sprite.scale = new PIXI.Point(this.texture.width, this.texture.height);
        } else {
            this.texture.baseTexture.addEventListener('loaded', function () {
                if (!self.isMouseOver) {
                    self.sprite.scale = new PIXI.Point(self.texture.width, self.texture.height);
                }
            });
        }


        this.sprite.setInteractive(true);
        //this.sprite.hitArea = new PIXI.Rectangle(position.x, position.y, size.x, size.w);
        this.sprite.mouseover = function (event) {
            self.isMouseOver = true;
            self.sprite.setTexture(self.texture);
            self.sprite.scale = new PIXI.Point(1, 1);
        }
        this.sprite.mouseout = function (event) {
            self.isMouseOver = false;
            self.sprite.setTexture(transparentTexture);
            self.sprite.scale = new PIXI.Point(self.texture.width, self.texture.height);

        }
        this.sprite.position = position;
    };

    function emptyStage() {
        var children = [].concat(stage.children);
        for (var i = 1, len = children.length; i < len; ++i) {
            stage.removeChild(children[i]);
        }
    }

    function changeStage(Room) {
        if (stage.children.length > 0) {
            emptyStage();
        }
        location.hash = Room;
        switch (Room) {
        case "#LivingRoom":
            LivingRoom();
            break;
        case "#Kitchen":
            Kitchen();
            break;
        default:
            MainPage();
            break;
        }
    }
    //176, 390
    //192, 720
    //643 - 178
    //980
    //160
    //647, 420

    function MainPage() {
        backgroundSprite.setTexture(mainPageTexture);
        var livingRoomHitArea = new PIXI.Sprite(transparentTexture),
            kitchenHitArea = new PIXI.Sprite(transparentTexture),
            scale = new PIXI.Point(1204, 450);

        livingRoomHitArea.scale = scale;
        livingRoomHitArea.position = new PIXI.Point(0, 450);
        kitchenHitArea.scale = scale;
        kitchenHitArea.position = new PIXI.Point(0, 0);

        livingRoomHitArea.mousedown = changeStage.bind(this, "#LivingRoom");
        kitchenHitArea.mousedown = changeStage.bind(this, "#Kitchen");

        livingRoomHitArea.setInteractive(true);
        kitchenHitArea.setInteractive(true);
        stage.addChild(livingRoomHitArea);
        stage.addChild(kitchenHitArea);

    }

    function Kitchen() {

        backgroundSprite.setTexture(kitchenTexture);
        window.bSprite = new PIXI.Text("Go Back");
        bSprite.interactive = true;
        bSprite.mousedown = changeStage.bind(this, "#MainPage");

        window.tSprite = new overSprite('toaster_mod.gif', new PIXI.Point(917, 206));
        window.fSprite = new overSprite('faucet_mod.gif', new PIXI.Point(361, 291));
        window.spSprite = new overSprite('stove_pot_mod.gif', new PIXI.Point(710, 217));
        //window.ufsprite2 = new unhappyFaceSprite(new PIXI.Point(555, 315));
        //ufsprite2.sprite.scale = new PIXI.Point(1.5, 1.5);
        //window.ufsprite3 = new unhappyFaceSprite(new PIXI.Point(555, 150));
        stage.addChild(bSprite);

        stage.addChild(fSprite.sprite);
        stage.addChild(tSprite.sprite);
        stage.addChild(spSprite.sprite);
    }

    function LivingRoom() {
        backgroundSprite.setTexture(livingRoomTexture);

        window.bSprite = new PIXI.Text("Go Back");
        bSprite.interactive = true;
        bSprite.mousedown = changeStage.bind(this, "#MainPage");

        window.fpSprite = new overSprite('fireplace_mod.gif', new PIXI.Point(34, 400));
        window.cSprite = new overSprite('candles_mod.gif', new PIXI.Point(505, 446));
        //window.ufsprite2 = new unhappyFaceSprite(new PIXI.Point(555, 315));
        //ufsprite2.sprite.scale = new PIXI.Point(1.5, 1.5);
        //window.ufsprite3 = new unhappyFaceSprite(new PIXI.Point(555, 150));
        stage.addChild(bSprite);
        stage.addChild(fpSprite.sprite);
        stage.addChild(cSprite.sprite);
    }
    //stage.addChild(ufsprite3.sprite);


    renderer.render(stage);
    changeStage(location.hash);
    window.stage = stage;
    window.renderer = renderer;

}());

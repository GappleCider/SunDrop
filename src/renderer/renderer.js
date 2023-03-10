class Renderer {
  constructor() {
    this.objs = [];

    // initialize the canvas and context
    this.domElement = document.createElement("canvas");
    this.ctx = this.domElement.getContext("2d");

    // set the canvas width and height to the window size
    this._canvasWidth = this.domElement.width = window.innerWidth;
    this._canvasHeight = this.domElement.height = window.innerHeight
  }

  render(camera = null) {
    this.ctx.clearRect(0, 0, this._canvasWidth, this._canvasHeight);
    if (camera) {
      this.ctx.save();
      this.ctx.translate(camera.pos.x, camera.pos.y);
    }

    for (let i = 0; i < this.objs.length; i++) {
      if (this.objs[i].type != "map") {
        this.objs[i].props.color != undefined
          ? (this.ctx.fillStyle = this.objs[i].props.color)
          : (this.ctx.fillStyle = "black");
      }

      if (this.objs[i].class === "polygon") {
        if (this.objs[i].props.visible) {
          this.ctx.beginPath();
          this.ctx.moveTo(this.objs[i].polygon[0].x, this.objs[i].polygon[0].y);
          for (let j = 0; j < this.objs[i].polygon.length - 1; j++) {
            this.ctx.lineTo(
              this.objs[i].polygon[j + 1].x,
              this.objs[i].polygon[j + 1].y
            );
          }
          this.ctx.lineTo(this.objs[i].polygon[0].x, this.objs[i].polygon[0].y);
          this.ctx.closePath();

          if (this.objs[i].props.drawStyle === "fill") {
            this.ctx.fill();
          } else if (this.objs[i].props.drawStyle === "stroke") {
            this.props.stroke.color != undefined
              ? (this.ctx.strokeStyle = this.props.stroke.color)
              : (this.ctx.strokeStyle = "black");

            this.props.stroke.width != undefined
              ? (this.ctx.lineWidth = this.props.stroke.width)
              : (this.ctx.lineWidth = 1);

            this.ctx.stroke();
          }
        }
      }

      if (this.objs[i].type === "line") {
        if (this.objs[i].props.visible) {
          this.objs[i].props.stroke.color != undefined
            ? (this.ctx.strokeStyle = this.objs[i].props.stroke.color)
            : (this.ctx.strokeStyle = "black");

          this.objs[i].props.stroke.width != undefined
            ? (this.ctx.lineWidth = this.objs[i].props.stroke.width)
            : (this.ctx.lineWidth = 1);

          this.ctx.beginPath();
          this.ctx.moveTo(this.objs[i].startPoint.x, this.objs[i].startPoint.y);
          this.ctx.lineTo(this.objs[i].endPoint.x, this.objs[i].endPoint.y);
          this.ctx.closePath();
          this.ctx.stroke();
        }
      }

      if (this.objs[i].type === "circle") {
        if (this.objs[i].props.visible) {
          this.ctx.beginPath();
          this.ctx.arc(
            this.objs[i].pos.x,
            this.objs[i].pos.y,
            this.objs[i].radius,
            0,
            Math.PI * 2
          );
          this.ctx.closePath();
          if (this.objs[i].props.drawStyle === "fill") {
            this.ctx.fill();
          }
          if (this.objs[i].props.drawStyle === "stroke") {
            this.objs[i].props.stroke.color != undefined
              ? (this.ctx.strokeStyle = this.objs[i].props.stroke.color)
              : (this.ctx.strokeStyle = "black");

            this.objs[i].props.stroke.width != undefined
              ? (this.ctx.lineWidth = this.objs[i].props.stroke.width)
              : (this.ctx.lineWidth = 1);

            this.ctx.stroke();
          }
        }
      }
      if (this.objs[i].type === "map") {
        for (let j = 0; j < this.objs[i].map.length; j++) {
          const char = this.objs[i].map[j];
          if (char.props.visible) {
            char.props.color != undefined
              ? (this.ctx.fillStyle = char.props.color)
              : (this.ctx.fillStyle = "black");

            if (char.props.type == "box") {
              this.ctx.beginPath();
              this.ctx.moveTo(char.polygon[0].x, char.polygon[0].y);
              for (let k = 0; k < char.polygon.length - 1; k++) {
                this.ctx.lineTo(char.polygon[k + 1].x, char.polygon[k + 1].y);
              }
              this.ctx.lineTo(char.polygon[0].x, char.polygon[0].y);
              this.ctx.closePath();
              if (char.props.drawStyle === "fill") {
                this.ctx.fill();
              }
              if (char.props.drawStyle === "stroke") {
                char.props.stroke.color != undefined
                  ? (this.ctx.strokeStyle = char.props.stroke.color)
                  : (this.ctx.strokeStyle = "black");

                char.props.stroke.width != undefined
                  ? (this.ctx.lineWidth = char.props.stroke.width)
                  : (this.ctx.lineWidth = 1);

                this.ctx.stroke();
              }
            }
            if (char.props.type == "circle") {
              this.ctx.beginPath();
              this.ctx.arc(
                char.pos.x,
                char.pos.y,
                char.props.radius,
                0,
                Math.PI * 2
              );
              this.ctx.closePath();
              if (char.props.drawStyle === "fill") {
                this.ctx.fill()
              }
              if (char.props.drawStyle === "stroke") {
                char.props.stroke.color!= undefined
                ? (this.ctx.strokeStyle = char.props.stroke.color)
                : (this.ctx.strokeStyle = "black");

                char.props.stroke.width!= undefined
                ? (this.ctx.lineWidth = char.props.stroke.width)
                : (this.ctx.lineWidth = 1);

                this.ctx.stroke();
              }
            }
          }
        }
      }
    }
    if (camera) {
      this.ctx.restore();
    }
  }
  add(obj) {
    this.objs.push(obj);
  }
  remove(obj) {
    this.objs.splice(this.objs.indexOf(obj), 1);
  }
  clear() {
    this.objs = [];
  }
  get(obj) {
    return this.objs.indexOf(obj);
  }
  update() {
    for (let i = 0; i < this.objs.length; i++) {
      if (this.objs[i].type === "box") {
        this.objs[i].update();
      }
      if (this.objs[i].type == 'map') {
        for (let j = 0; j < this.objs[i].map.length; j++) {
          const char = this.objs[i].map[j];

          for (let k = 0; k < Object.keys(char.props).length; k++) {
            if (typeof char.props[Object.keys(char.props)[k]] === 'function') {
              if (char.props.moveX) {
                char.pos.x = char.props.moveX(char);
              }
              if (char.props.moveY) {
                char.pos.y = char.props.moveY(char);
              }
            }
          }
        }
      }
    }
  }
  createGradient(type, colors, width, height) {
    if (type === "linear") {
      const gradient = this.ctx.createLinearGradient(0, 0, width, height);
      for (let i = 0; i <= colors.length; i++) {
        const color = colors[i];
        gradient.addColorStop(i / colors.length, color);
      }
      return gradient;
    }
  }
  createRGBAColor(r, g, b, a) {
    return "rgba(" + r + "," + g + "," + b + "," + a + ")";
  }
  createHexColor(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let colour = "#";
    for (var i = 0; i < 3; i++) {
      let value = (hash >> (i * 8)) & 0xff;
      colour += ("00" + value.toString(16)).substr(-2);
    }
    return colour;
  }
  convertHexToRGBA(hex) {
    let c;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
      c = hex.substring(1).split("");
      if (c.length == 3) {
        c = [c[0], c[0], c[1], c[1], c[2], c[2]];
      }
      c = "0x" + c.join("");
      return (
        "rgba(" + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",") + ",1)"
      );
    }
  }
  setSize(width, height) {
    this._canvasWidth = this.domElement.width = width;
    this._canvasHeight = this.domElement.height = height;
  }
  setColor(color) {
    this.domElement.style.backgroundColor = color;
  }
  setAlpha(alpha) {
    this.domElement.style.opacity = alpha;
  }
}

export { Renderer };

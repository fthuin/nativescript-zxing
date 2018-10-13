"use strict";
exports.__esModule = true;
var NativeZXing = /** @class */ (function () {
    function NativeZXing() {
        this.QR_CODE = NativeZXing.QR_CODE;
        this.EAN_8 = NativeZXing.EAN_8;
        this.UPC_E = NativeZXing.UPC_E;
        this.EAN_13 = NativeZXing.EAN_13;
        this.UPC_A = NativeZXing.UPC_A;
        this.CODE_39 = NativeZXing.CODE_39;
        this.CODE_93 = NativeZXing.CODE_93;
        this.CODE_128 = NativeZXing.CODE_128;
        this.ITF = NativeZXing.ITF;
        this.PDF_417 = NativeZXing.PDF_417;
        this.CODABAR = NativeZXing.CODABAR;
        this.DATA_MATRIX = NativeZXing.DATA_MATRIX;
        this.AZTEC = NativeZXing.AZTEC;
    }
    NativeZXing.prototype.createBarcode = function (options) {
        var encode = "NOTHING", width = 100, height = 100, format = this.QR_CODE;
        if (options) {
            if (options.encode) {
                encode = options.encode;
            }
            if (options.width) {
                width = options.width;
            }
            if (options.height) {
                height = options.height;
            }
            if (options.format) {
                format = options.format;
            }
        }
        var hints = new java.util.Hashtable();
        var characterset = com.google.zxing.EncodeHintType.CHARACTER_SET;
        hints.put(characterset, "utf-8");
        var writer = new com.google.zxing.MultiFormatWriter();
        var result = writer.encode(encode, format, width, height, hints);
        width = result.getWidth();
        height = result.getHeight();
        var pixels = [];
        for (var y = 0; y < height; y++) {
            var offset = y * width;
            for (var x = 0; x < width; x++) {
                pixels[offset + x] = result.get(x, y) ? 0xFF000000 : 0xFFFFFFFF; // Black : White
            }
        }
        var bitmap = android.graphics.Bitmap.createBitmap(width, height, android.graphics.Bitmap.Config.ARGB_8888);
        bitmap.setPixels(pixels, 0, width, 0, 0, width, height);
        return bitmap;
    };
    NativeZXing.prototype.decodeBarcode = function (bitmap, options) {
        if (bitmap === null) {
            return null;
        }
        var width = bitmap.getWidth(), height = bitmap.getHeight();
        var totalSize = width * height;
        var buffer = java.lang.reflect.Array.newInstance(java.lang.Integer["class"].getField("TYPE").get(null), totalSize);
        bitmap.getPixels(buffer, 0, width, 0, 0, width, height);
        var source = new com.google.zxing.RGBLuminanceSource(width, height, buffer);
        var hybBitmap = new com.google.zxing.BinaryBitmap(new com.google.zxing.common.HybridBinarizer(source));
        source = null;
        buffer = null;
        var hints = null;
        if (options && options.formats) {
            var decodeFormats = new java.util.Vector();
            for (var i = 0; i < options.formats.length; i++) {
                decodeFormats.add(options.formats[i]);
            }
            if (!hints) {
                hints = new java.util.Hashtable();
                hints.put(com.google.zxing.DecodeHintType.POSSIBLE_FORMATS, decodeFormats);
            }
        }
        if (options && options.tryHarder) {
            if (!hints) {
                hints = new java.util.Hashtable();
                hints.put(com.google.zxing.DecodeHintType.TRY_HARDER, java.lang.Boolean.TRUE);
            }
        }
        if (options && options.characterSet) {
            if (!hints) {
                hints = new java.util.Hashtable();
                hints.put(com.google.zxing.DecodeHintType.CHARACTER_SET, options.characterSet);
            }
        }
        var reader = new com.google.zxing.MultiFormatReader();
        try {
            if (hints) {
                reader.setHints(hints);
            }
            var result = reader.decode(hybBitmap);
            hybBitmap = null;
            return {
                format: result.getBarcodeFormat().toString(),
                barcode: result.getText()
            };
        }
        catch (err) {
            // console.log(err);
        }
        return null;
    };
    // Create Mapping to make this simpler to choose a barcode type.
    NativeZXing.QR_CODE = com.google.zxing.BarcodeFormat.QR_CODE;
    NativeZXing.EAN_8 = com.google.zxing.BarcodeFormat.EAN_8;
    NativeZXing.UPC_E = com.google.zxing.BarcodeFormat.UPC_E;
    NativeZXing.EAN_13 = com.google.zxing.BarcodeFormat.EAN_13;
    NativeZXing.UPC_A = com.google.zxing.BarcodeFormat.UPC_A;
    NativeZXing.CODE_39 = com.google.zxing.BarcodeFormat.CODE_39;
    NativeZXing.CODE_93 = com.google.zxing.BarcodeFormat.CODE_93;
    NativeZXing.CODE_128 = com.google.zxing.BarcodeFormat.CODE_128;
    NativeZXing.ITF = com.google.zxing.BarcodeFormat.ITF;
    NativeZXing.PDF_417 = com.google.zxing.BarcodeFormat.PDF_417;
    NativeZXing.CODABAR = com.google.zxing.BarcodeFormat.CODABAR;
    NativeZXing.DATA_MATRIX = com.google.zxing.BarcodeFormat.DATA_MATRIX;
    NativeZXing.AZTEC = com.google.zxing.BarcodeFormat.AZTEC;
    return NativeZXing;
}());
exports.NativeZXing = NativeZXing;

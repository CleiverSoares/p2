<template>
    <div class="pai">
        <div class="filho">

            <div class="photo-carousel" :style="carouselStyle">

                <div class="galeria">
                    <button @click="prev">&lt</button>
                </div>
                <div class="galeria">
                    <button @click="next">></button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Galeria",

    data() {
        return {
            currentPhotoIndex: 0,
            photos: [
                'https://tse4.mm.bing.net/th?id=OIP.MxsibF8qNsY-OjAn1V1iMgHaFj&pid=Api&P=0','https://tse3.mm.bing.net/th?id=OIP.h1YM6YfQOq5Xg9FejAubQwHaE5&pid=Api&P=0'

            ],
        }
    },
    mounted() {
        // Avança automaticamente para a próxima imagem a cada 3 segundos
        setInterval(() => {
            this.next();
        }, 3000);
    },
    computed: {
        carouselStyle() {
            return {
                'background-image': `url(${this.photos[this.currentPhotoIndex]})`
            }
        }
    },
    computed: {
        carouselStyle() {
            const currentPhoto = this.photos?.[this.currentPhotoIndex] ?? '';
            return {
                'background-image': `url(${currentPhoto})`
            }
        }
    },
    methods: {
        prev() {
            if (this.currentPhotoIndex > 0) {
                this.currentPhotoIndex--
            } else {
                this.currentPhotoIndex = this.photos.length - 1
            }
        },
        next() {
            if (this.currentPhotoIndex < this.photos.length - 1) {
                this.currentPhotoIndex++
            } else {
                this.currentPhotoIndex = 0
            }
        }
    }
}

</script>

<style scoped>
.galeria {
    opacity: 50%;
    justify-content: space-around;
}

.galeria button {
    background-color: rgba(209, 21, 113, 255);
    font-weight: bold;
    padding: 5px;
}

.photo-carousel {
    display: flex;
    min-height: 100%;
    width: 100%;
    background-size: cover;
    align-items: center;
    text-align: center;
    justify-content: space-around !important;
    border-radius: 5px;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

}

.pai {
    width: 100%;
    display: flex;
    justify-content: center;
    align-self: center;
    min-height: calc(100vh - 170px);
}

.filho {
    width: 60%;
    justify-content: center;
    align-items: center;
}


#main-banner h1 {
    color: rgba(209, 21, 113, 255);
    text-align: center;
    font-size: 60px;
    background-color: #222;
    padding: 20px 40px;
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    border-bottom: 4px solid #111;
}
</style>
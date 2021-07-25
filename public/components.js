const Home = {
    template: `<div>Home</div>`
}

const About = {
    template: `<div>About</div>`
}

const NotFound = {
    template: `<div>Halaman tidak ditemukan...</div>`
}

const DetailKelas = {
    template: `<div>
        <template v-if="detailKelas">
            <img :src="urlGambar(detailKelas.gambar)" width="200"/>
            <h3>{{ detailKelas.judul }}</h3>
            <p>{{ detailKelas.deskripsi }}</p>
            <router-link to="/kelas">Kembali</router-link>
        </template>
        <p v-else>kelas tidak ada</p>
    </div>`,
    data: function() {
        return {
            detailKelas: {}
        }
    },
    methods: {
        filterKelas() {
            //const kelas = JSON.parse(localStorage.getItem('kelas'))
            const id = this.$route.params.idKelas
            //const dataDetailKelas = kelas.filter((data) => data.id === id)

            const kelasDetailRef = db.ref('kelas/'+id)
            kelasDetailRef.on('value', (item) => {
                this.detailKelas = item.val()
            })
            //this.detailKelas = dataDetailKelas[0]
        },
        urlGambar: function(gambar) {
            return gambar ? "/images/"+gambar : ""
        }
    },
    created() {
        this.filterKelas()
    }
}

const Kelas = {
    props: ['items'],
    template: `
        <div>
            <h3>Tambah Kelas</h3>

            <form v-on:submit.prevent="submitKelas">
                <div class="input-group">
                    <input 
                        type="text" placeholder="Nama Kelas" 
                        v-on:change="cekLength('judul')"
                        v-model="kelas.judul">
                    <div v-if="error.judul" class='error'>{{ error.judul }}</div>
                </div>
                <div>
                    <textarea 
                        name="deskripsi" id="deskripsi" cols="30" rows="3" 
                        v-model="kelas.deskripsi"
                        v-on:change="cekLength('deskripsi')"
                    ></textarea>
                    <div v-if="error.deskripsi" class='error'>{{ error.deskripsi }}</div>
                </div>
                <div class="input-group">
                    <img v-if="previewing" :src="previewing" width="200"/>
                    <input 
                        type="file" 
                        accept="image/*"
                        ref="gambar"
                        v-on:change="upload">
                </div>
                <button 
                    type="submit"
                >Submit</button>
            </form>

            <hr/>

            <h3>Daftar Kelas {{ items.length }}</h3>
            <template v-if="items.length">  <!-- menggunakan element template untuk membungkus conditioning rendering -->
                <ul>    <!-- v-if membuat elementnya benar" hilang tidak ditampilkan -->
                    
                    <!--<li v-for="k in items">
                        {{ k }}
                    </li>-->    <!-- cara v-for 1 -->
                    <!-- <li v-for="item of items" v-text="item"></li> -->   <!-- cara v-for ke 2 menggunakan v-item -->
                    
                    <li v-for="(item, index) of items">
                        <img :src="'../images/' + item.gambar" width="80"/>
                        <p>
                            {{ index+1 }} - {{item.judul}} - 
                            <a href="#" v-on:click.prevent="$emit('hapus-kelas', item.id)">Hapus</a> - 
                            <router-link :to="'/kelas/'+item.id">Lihat kelas</router-link>
                        </p>
                    </li>   <!-- cara v-for ke 3 mengakses indexnya -->
                </ul>
            </template>
            
            <ul v-else>
                <li>Kelas belum tersedia</li>
            </ul>
        </div>
    `,
    data: function() {
        return {
            kelas: {
                judul: '',
                deskripsi: '',
                gambar: '',
            },
            previewing: '',
            error: {
                judul: '',
                deskripsi: '',
            }
        }
    },
    methods: {
        submitKelas: function() {
            this.error.judul = ''
            this.error.deskripsi = ''

            if (this.kelas.judul === '') {
                this.error.judul = 'Judul is required'
            }
            if (this.kelas.deskripsi === '') {
                this.error.deskripsi = 'Deskripsi is required'
            }

            if (this.kelas.judul && this.kelas.deskripsi) {
                const data = {
                    id: uuidv4(),
                    judul: this.kelas.judul,
                    deskripsi: this.kelas.deskripsi,
                    gambar: this.kelas.gambar
                }
                this.$emit('submit-kelas', data)

                /* this.kelas = {
                    judul: '',
                    deskripsi: '',
                    gambar: '',
                },
                this.previewing = '' */

                this.kelas.judul = ""
                this.kelas.deskripsi = ""
                this.kelas.gambar = ""
                this.previewing = ""
                this.$refs.gambar.value = "" // untuk menghapus value dari input type filenya
            }
        },
        upload: function(event) {
            const image = event.target.files[0]
            console.log(event)
            console.log(image)
            this.kelas.gambar = image.name
            this.previewing = URL.createObjectURL(image)
        },
        cekLength: function(field) {
            if (field == 'judul') {
                if(this.error.judul.length > 0) {
                    this.error.judul = ''
                }
            }

            if (field == 'deskripsi') {
                if(this.error.deskripsi.length > 0) {
                    this.error.deskripsi = ''
                }
            }

        }
    },
}

// membuat component, harus sebelum instance object new Vuenya
Vue.component('header-component', {
    // implementasi props didalam templates
    template: `<header>
            <img :src="gambar" alt="vueJS" width="80">
            <p>{{ tagline }}</p>
            <p>{{ 'Hello ' + name }}</p>
        </header>`,
    data: function() {
        return {
            tagline: 'The progressive javascript framework'
        }
    },
    props: ['name', 'gambar']   // menggunakan props
})

Vue.component('footer-component', {
    template: `
        <footer id="footer">
            <slot></slot>
        </footer>
    `
    // menggunakan slot, untuk merender attribute yg ada didalam komponen
    // dalam hal ini contohnya adalah <p></p> didalam component <footer-component>
})
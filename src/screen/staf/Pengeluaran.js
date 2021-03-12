import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableNativeFeedback,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import styles from '../../assets/style/boxStaff/index';

export class Pengeluaran extends Component {
  constructor() {
    super();
    this.state = {
      token: '',
      months: '',
      month: '',
      date: '',
      year: '',
      beban_id: '',
      subtotal_pengeluaran: '',
      deskripsi: '',
      tanggal: '',
      loading: false,
    };
  }

  ShowCurrentDate = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    this.setState({date: date, month: month, year: year});
  };
  getMonth = () => {
    return this.state.months
      .filter((item, index) => this.state.month == index + 1)
      .map((v, i) => {
        return this.state.date + ' ' + v + ' ' + this.state.year;
      });
  };
  componentDidMount() {
    AsyncStorage.getItem('token').then((token) => {
      if (token) {
        this.setState({token: token});
        console.log(this.state.token);
      } else {
        console.log('tidak ada token');
      }
    });
  }
  Laporan = () => {
    console.log('laporan');
    const {
      tanggal,
      beban_id,
      subtotal_pengeluaran,
      deskripsi,
      token,
    } = this.state;
    const data = {
      tanggal: tanggal,
      beban_id: beban_id,
      deskripsi: deskripsi,
      subtotal_pengeluaran: subtotal_pengeluaran,
    };
    const url =
      'https://katastima-pos.herokuapp.com/api/staff/pengeluaran/make';
    this.setState({loading: true});
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((respon) => {
        console.log('ini respon dari laporan : ', respon);
        this.setState({loading: false});
      })
      .catch((error) => {
        console.log('ini ada dari laporan error', error);
        this.setState({loading: false});
      });
  };
  render() {
    return (
      <View style={styles.utama}>
        <View style={styles.headher}>
          <Text style={styles.tittel}> Laporan Pengeluaran</Text>
        </View>
        <ScrollView>
          <View style={styles.boxDataInput}>
            <Text style={styles.font}> Tanggal :</Text>
            <TextInput
              placeholder="TT - BB - TH"
              onChangeText={(taks) => this.setState({tanggal: taks})}
              keyboardType="number-pad"
            />
          </View>
          <View style={styles.boxDataInput}>
            <Text style={styles.font}> Jenis Pengeluaran : </Text>
            <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => this.setState({beban_id: '1'})}
                style={styles.boxKate}>
                <Text style={styles.taksKate}>Beban Gaji Karyawan</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.setState({beban_id: '2'})}
                style={styles.boxKate}>
                <Text style={styles.taksKate}>Beban Listrik</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.setState({beban_id: '3'})}
                style={styles.boxKate}>
                <Text style={styles.taksKate}>Beban Air</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.setState({beban_id: '4'})}
                style={styles.boxKate}>
                <Text style={styles.taksKate}>Beban Penyewaan Gedung</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.setState({beban_id: '5'})}
                style={styles.boxKate}>
                <Text style={styles.taksKate}>Beban Angkut Penjualan</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.setState({beban_id: '6'})}
                style={styles.boxKate}>
                <Text style={styles.taksKate}>Harga Pokok Penjualan</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.setState({beban_id: '7'})}
                style={styles.boxKate}>
                <Text style={styles.taksKate}>Beban Lain-Lain</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.boxDataInput}>
            <Text style={styles.font}> Deskripsi :</Text>
            <TextInput
              placeholder="Deskripsi"
              onChangeText={(taks) => this.setState({deskripsi: taks})}
            />
          </View>
          <View style={styles.boxDataInput}>
            <Text style={styles.font}> Total Pengeluaran :</Text>
            <TextInput
              placeholder="Jumlah Barang"
              onChangeText={(taks) =>
                this.setState({subtotal_pengeluaran: taks})
              }
              keyboardType="number-pad"
            />
          </View>
          <TouchableNativeFeedback onPress={() => this.Laporan()}>
            <View
              style={{
                ...styles.headher,
                alignSelf: 'center',
                borderRadius: 10,
                marginVertical: 30,
              }}>
              <Text style={styles.tittel}> Buat Laporan </Text>
            </View>
          </TouchableNativeFeedback>
        </ScrollView>
      </View>
    );
  }
}

export default Pengeluaran;

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { getChartDet } from '../../Api/ArtistApi';

function ArtistCharts() {
    const [data, setData] = useState([]);
    const { id } = useSelector((state) => state.artist);
    useEffect(() => {
      const invoke = async () => {
        const result = await getChartDet(id);
        setData(result.data);

      };
      invoke();
    }, []);
    return (
        <div className="flex justify-center items-center">
        <ResponsiveContainer width="80%" height={350}>
          <LineChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <Line type="monotone" dataKey="followers" stroke="#82ca9d" />
            <Tooltip />
            <Legend />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
  
  export default ArtistCharts;
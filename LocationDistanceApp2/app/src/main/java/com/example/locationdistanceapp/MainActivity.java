package com.example.locationdistanceapp;

import androidx.appcompat.app.AppCompatActivity;
import android.location.Address;
import android.location.Geocoder;
import android.location.Location;
import android.os.Bundle;
import android.view.View;
import android.widget.*;
import java.io.IOException;
import java.util.List;
import java.util.Locale;

public class MainActivity extends AppCompatActivity {

    EditText location1, location2;
    Button calculateBtn;
    TextView result;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        location1 = findViewById(R.id.location1);
        location2 = findViewById(R.id.location2);
        calculateBtn = findViewById(R.id.calculateBtn);
        result = findViewById(R.id.result);

        calculateBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                String loc1 = location1.getText().toString();
                String loc2 = location2.getText().toString();
                calculateDistance(loc1, loc2);
            }
        });
    }

    private void calculateDistance(String loc1, String loc2) {
        Geocoder geocoder = new Geocoder(this, Locale.getDefault());

        try {
            List<Address> addressList1 = geocoder.getFromLocationName(loc1, 1);
            List<Address> addressList2 = geocoder.getFromLocationName(loc2, 1);

            if (!addressList1.isEmpty() && !addressList2.isEmpty()) {
                Address address1 = addressList1.get(0);
                Address address2 = addressList2.get(0);

                float[] results = new float[1];
                Location.distanceBetween(
                        address1.getLatitude(), address1.getLongitude(),
                        address2.getLatitude(), address2.getLongitude(),
                        results
                );

                float distanceInKm = results[0] / 1000;
                result.setText("Distance: " + distanceInKm + " km");
            } else {
                result.setText("Location not found.");
            }

        } catch (IOException e) {
            e.printStackTrace();
            result.setText("Error getting locations.");
        }
    }
}

import pandas as pd


def get_data_from_csv(filename):
    """Reading data from csv file"""
    df_data = pd.read_csv(filename)
    columns = df_data.columns
    columns = [name.strip().replace(" ", "_").lower() for name in columns]
    df_data.columns = columns
    data = df_data.to_dict(orient="records")
    return data

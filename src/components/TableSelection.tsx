"use client";
import cx from "clsx";
import { useState, useEffect, useMemo } from "react";
import {
  Table,
  Checkbox,
  ScrollArea,
  Group,
  Avatar,
  Text,
  rem,
} from "@mantine/core";
import classes from "./TableSelection.module.css";
import axios from "axios";

export default function TableSelection() {
  const [selection, setSelection] = useState(["1"]);
  const [data, setData] = useState<any[]>([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response=await axios.get('https://63c57732f80fabd877e93ed1.mockapi.io/api/v1/users')
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    
    fetchData();
  }, []);

  const cacheData = useMemo(() => {
    return data.map((item) => ({
      id: item.id,
      name: item.name,
      avatar: item.avatar,
      email: item.email,
      job: item.job,
    }));
  }, [data]);

  const toggleRow = (id: string) =>
    setSelection((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  const toggleAll = () =>
    setSelection((current) =>
      current.length === cacheData.length ? [] : data.map((item) => item.id)
    );

  const rows = cacheData.map((item) => {
    const selected = selection.includes(item.id);
    return (
      <Table.Tr
        key={item.id}
        className={cx({ [classes.rowSelected]: selected })}
      >
        <Table.Td>
          <Checkbox
            checked={selection.includes(item.id)}
            onChange={() => toggleRow(item.id)}
          />
        </Table.Td>
        <Table.Td>
          <Group gap="sm">
            <Avatar size={26} src={item.avatar} radius={26} />
            <Text size="sm" fw={500}>
              {item?.name}
            </Text>
          </Group>
        </Table.Td>
        <Table.Td>{item.email}</Table.Td>
        <Table.Td>{item.job}</Table.Td>
      </Table.Tr>
    );
  });

  return (
    <ScrollArea>
      <Table className='min-w-full' verticalSpacing="sm">
        <Table.Thead>
          <Table.Tr>
            <Table.Th style={{ width: rem(40) }}>
              <Checkbox
                onChange={toggleAll}
                checked={selection.length === data.length}
                indeterminate={
                  selection.length > 0 && selection.length !== data.length
                }
              />
            </Table.Th>
            <Table.Th>User</Table.Th>
            <Table.Th>Email</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </ScrollArea>
  );
}
